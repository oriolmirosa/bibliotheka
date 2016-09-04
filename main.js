import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import App from './App'

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept('./App', () => {
    const AppCont = require('./App').default
    ReactDOM.render(
      <AppContainer>
        <AppCont />
      </AppContainer>,
      document.getElementById('app')
    )
  })
}
