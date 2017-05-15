import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils'
import { Actions } from 'react-native-router-flux';

//Custom components
import RouteButton from './toolkit/RouteButton'

class PlaceHolderTitle extends Component {
  constructor(props){
      super(props);
  }

  render() {
    const username = this.props.username || ""
    return (
      <View style={styles.outerContainer}>
        <Text style={styles.introHeader} h3>Werewolf</Text>
        <RouteButton
            title="Login"
            backgroundColor="green"
            route={() => Actions.login()}
            />
        <RouteButton
            title="Create Game"
            backgroundColor="blue"
            route={() => Actions.createGame()}
            />
        <RouteButton
            title="Join Game"
            backgroundColor="cyan"
            route={() => Actions.joinGame()}
            />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  introHeader: {
      marginBottom: 30,
  },
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
},
})


export default connect(mapStateToProps, mapDispatchToProps)(PlaceHolderTitle);