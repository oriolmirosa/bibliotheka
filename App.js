import React from 'react'
import Root from './Root'
import { Provider } from 'react-redux'
import store from './store'
import { Router, browserHistory, Route } from 'react-router'

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/' component={Root} />
        </Router>
      </Provider>
    )
  }
}

export default App
