import React from 'react'
import Screen from './Screen'
import Panel from './Panel'
import Divisor from './Divisor'
import styles from './styles.css'

// const styles = require('./styles.css')

class SplitPane extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      resize: false,
      x: 0,
      widthL: this.props.widthL
    }
    this.dragStart = this.dragStart.bind(this)
    this.drag = this.drag.bind(this)
    this.dragRelease = this.dragRelease.bind(this)
  }

  dragStart (e) {
    this.unFocus()
    document.addEventListener('mouseup', this.dragRelease, true)
    document.addEventListener('mousemove', this.drag, true)
    this.setState({resize: true})
    this.setState({x: e.clientX})
  }

  drag (e) {
    this.unFocus()
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

  unFocus () {
    if (document.selection) {
      document.selection.empty()
    } else {
      window.getSelection().removeAllRanges()
    }
  }

  render () {
    let styleL = {
      width: this.state.widthL + 'px',
      // flex: 1,
      position: 'relative',
      outline: 'none'
    }

    let styleR = {

      // flex: 1,
      position: 'flex',
      outline: 'none'
    }

    const children = this.props.children

    return (
      <Screen className={styles.screen}>
        <Panel style={styleL}>
          {children[0]}
        </Panel>
        <Divisor className={styles.divisor} mousePushedDown={this.dragStart}>
        </Divisor>
        <Panel style={styleR}>
          {children[1]}
        </Panel>
      </Screen>
    )
  }
}

export default SplitPane
