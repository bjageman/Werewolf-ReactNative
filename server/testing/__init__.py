import os
import unittest
import json

from apps import app, db, socketio
from apps.users.models import User
from apps.games.models import Game, Player, Role, Vote

from apps.config import DATABASE_TEST

from flask_socketio import SocketIO, SocketIOTestClient

roles = [
    {"name":"Werewolf", "avatar": "https://placekitten.com/g/300/400", "evil":True},
    {"name":"Villager", "avatar": "http://www.smashbros.com/images/og/murabito.jpg", "evil":False},
    {"name":"Seer", "avatar": "https://legendsofwindemere.files.wordpress.com/2014/02/the_fortune_teller_by_jerry8448-d378fed.jpg", "evil":False}
]

class TestingBase(unittest.TestCase):
    def setAuthToken(self, username, password):
        response = self.app.post('/auth',
            data='{"username":"' + username + '","password":"' + password + '"}',
            headers=self.headers)
        data = self.parseData(response.data)
        self.headers['Authorization'] = 'JWT ' + data['access_token']

    def initDB(self):
        game = Game(code="TESTCODE")
        self.db.session.add(game)
        for i in roles:
            role = Role(name=i['name'], avatar=i['avatar'], evil=i['evil'])
            self.db.session.add(role)
        self.db.session.commit()
        for i in range(15):
            user = User(username="TestUser" + str(i))
            user.hash_password("password")
            if i == 0:
                user.admin = True
            self.db.session.add(user)
            if i < 2: #Werewolves
                role = Role.query.get(1)
            elif i == 3: #Seer
                role = Role.query.get(3)
            else: #Villagers
                role = Role.query.get(2)
            if i < 10:
                player = Player(game=game, user=user, role=role)
                self.db.session.add(player)
        self.db.session.commit()

    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_TEST
        self.app = app.test_client()
        self.db = db
        self.db.create_all()
        self.socketio = SocketIOTestClient(app, socketio)
        self.initDB()


    def tearDown(self):
        self.socketio.disconnect()
        self.db.session.expunge_all()
        self.db.session.flush()
        self.db.session.remove()
        self.db.session.close()
        self.db.drop_all()


class WWTesting(TestingBase):

    def kill_players_by_id(self, game, playerids = [], turn = 0):
        players = []
        for playerid in playerids:
            player = Player.query.get(playerid)
            players.append(player)
            player.alive = False
        db.session.commit()

    def kill_player_by_username(self, username, turn = 0):
        user = User.query.filter_by(username=username).first()
        game = Game.query.get(1)
        #player = game.players.filter(Player.user.has(username=username)).first()
        player = game.players.join(Player.user, aliased=True).filter_by(username=username).first()
        assert username in player.user.username
        player.alive = False
        db.session.commit()
        assert game.players.join(Player.user, aliased=True).filter_by(username=username).first().alive is not True

    def player_count(self):
        game = Game.query.get(1)
        counter = {"Villagers": 0, "Werewolves": 0}
        for player in game.players:
            if player.role.name == "Werewolf":
                counter['Werewolves'] = counter['Werewolves'] + 1
            elif player.role.name == "Villager":
                counter['Villagers'] = counter['Villagers'] + 1
        return counter
