import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import { connect } from 'react-redux'

import { mapStateToProps, mapDispatchToProps } from '../redux/utils'

import NavBar from './components/base/NavBar'
import Security from './components/toolkit/Security'

import Home from './components/Home'
import Register from './components/users/Register'
import JoinGame from './components/setup/JoinGame'
import CreateGame from './components/setup/CreateGame'
import WaitingRoom from './components/setup/WaitingRoom'
import RoleAssign from './components/game/RoleAssign'
import Menu from './components/game/menu/index'
import FinalSummary from './components/game/summary/Final'

const App = () => (
  <Router>
    <div>
      <Route path="/" component={NavBar}/>
      <div className="container text-center col-sm-4 col-md-6 col-md-offset-2">
          <Route exact path="/" component={Home}/>
          <Route path="/register" component={Register}/>
          <Route path="/games" component={JoinGame}/>
          <Route path="/create/" component={CreateGame}/>
          <Route path="/create/id/:id" component={WaitingRoom}/>
          <Route path="/game/" component={Security} />
          <Route path="/game/assignment" component={RoleAssign}/>
          <Route path="/game/menu" component={Menu} />
          <Route path="/game/results" component={FinalSummary} />
      </div>
    </div>
  </Router>
)

export default connect(mapStateToProps, mapDispatchToProps)(App);