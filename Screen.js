import React from 'react'
import Panel from './Panel'
import Divisor from './Divisor'

const body = {
  height: 100 + 'vh'
}

class Screen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      x: 15,
      dragOffsetLeft: 0,
      dragOffsetRight: 0
    }
    this.dragStart = this.dragStart.bind(this)
  }

  dragStart (e) {
    this.setState({x: e.clientX})
    // this.setState({dragOffsetLeft: this.offsetWidth - this.state.x})
    // this.setState({dragOffsetRight: this.offsetWidth - this.state.x})

    console.log(this.state.x)
  }

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

export default Screen
