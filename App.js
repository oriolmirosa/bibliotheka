import React from 'react'
import Panel from './Panel'
import Divisor from './Divisor'

let body = {
  height: 100 + 'vh'
}

class App extends React.Component {
  render () {
    return (
      <div style={body}>
        <Panel text='Left' />
        <Divisor />
        <Panel text='Right' />
      </div>
    )
  }
}

export default App
