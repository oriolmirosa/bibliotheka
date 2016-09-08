import React from 'react'
import Screen from './Screen'
import Panel from './Panel'
import Divisor from './Divisor'
import styles from './styles.css'

// const styles = require('./styles.css')

class Root extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      resize: false,
      x: 0,
      widthL: 250
    }
    this.dragStart = this.dragStart.bind(this)
    this.drag = this.drag.bind(this)
    this.dragRelease = this.dragRelease.bind(this)
  }

  dragStart (e) {
    document.addEventListener('mouseup', this.dragRelease, true)
    document.addEventListener('mousemove', this.drag, true)
    this.setState({resize: true})
    this.setState({x: e.clientX})
  }

  drag (e) {
    if (this.state.resize) {
      this.setState({x: e.clientX})
      this.setState({widthL: this.state.x})
    }
  }

  dragRelease (e) {
    document.removeEventListener('mouseup', this.dragRelease)
    document.removeEventListener('mousemove', this.drag)
    this.setState({resize: false})
  }

  render () {
    let styleL = {
      width: this.state.widthL + 'px'
    }

    return (
      <Screen className={styles.screen}>
        <Panel style={styleL}>
          {this.state.widthL}
        </Panel>
        <Divisor className={styles.divisor} mousePushedDown={this.dragStart}>
          {this.props.children}
        </Divisor>
        <Panel>
          {this.state.widthR}
        </Panel>
      </Screen>
    )
  }
}

export default Root
