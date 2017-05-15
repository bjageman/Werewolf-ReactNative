import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'

import { mapStateToProps, mapDispatchToProps } from './utils'

import { default as Home } from './components/Home'
import { default as Login } from './components/users/Login'
import { default as CreateGame } from './components/setup/CreateGame'
import { default as JoinGame } from './components/setup/JoinGame'
import { default as WaitingRoom } from './components/setup/WaitingRoom'
import { default as VillagerVote } from './components/game/menu/VillagerVote'
import { default as SpecialVote } from './components/game/menu/SpecialVote'
import { default as PreviousTurnResults } from './components/game/menu/PreviousTurnResults'
import { default as RoleAssign } from './components/game/RoleAssign'
import { default as TurnResults } from './components/game/TurnResults'
import { default as FinalResults } from './components/game/FinalResults'

const TabText = ({ selected, title}) => {
    return (
      <Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>
    )
}

const TabIcon = ({ selected, title, iname}) => {
    return (
        <Icon name={iname} color={selected ? 'red' : 'black'} />
    )
}

class App extends Component {
  render() {
    return (
      <Router initial="landing">
        <Scene key="root">
            <Scene key="home" component={Home} title="Werewolf Home" initial={true} />
            <Scene key="login" component={Login} title="Login" />
            <Scene key="createGame" component={CreateGame} title="Create Game" />
            <Scene key="joinGame" component={JoinGame} title="Join Game"  />
            <Scene key="waitingRoom" component={WaitingRoom} title="Waiting For Players"  />
            <Scene key="menu" tabs={true} style={{backgroundColor: "white"}}>
                <Scene key="villagerVote" component={VillagerVote} title="Vote on Culprit" iname="home" icon={TabIcon}  />
                <Scene key="specialVote" component={SpecialVote} title="Vote on 'Culprit'" iname="stars" icon={TabIcon} />
                <Scene key="previousTurnResults" component={PreviousTurnResults} title="Death Toll" iname="sentiment-very-dissatisfied" icon={TabIcon} />
            </Scene>
            <Scene key="finalResults" component={FinalResults} title="Game Over!"/>

            <Scene key="roleAssign" component={RoleAssign} title="Your Role"  />

        </Scene>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);