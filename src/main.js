import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/containers/App'

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept('./components/containers/App', () => {
    const AppCont = require('./components/containers/App').default
    ReactDOM.render(
      <AppContainer>
        <AppCont />
      </AppContainer>,
      document.getElementById('app')
    )
  })
}
