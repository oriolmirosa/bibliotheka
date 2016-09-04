import React from 'react'
import Root from './Root'
import { Router, browserHistory, Route } from 'react-router'

class App extends React.Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Root} />
      </Router>
    )
  }
}

export default App
