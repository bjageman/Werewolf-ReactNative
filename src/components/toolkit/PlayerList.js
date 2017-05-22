import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToProps } from '../../utils';



class PlayerList extends Component {
  constructor(props){
      super(props);
      this.handleVote = this.handleVote.bind(this)
  }

  handleVote(player){
      console.log(player)
  }

  render() {
    const players = this.props.players
    const voting = this.props.voting || false
    return (
      <ScrollView>
      <List containerStyle={{marginBottom: 20}}>
        {
          players.map((player, i) => (
            <ListItem
              roundAvatar
              key={player.id}
              title={player.user.username}
              hideChevron
              onPress={voting ? () => this.handleVote(player): null}
            />
          ))
        }
      </List>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    marginTop:10,
    marginBottom:10,
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerList)
