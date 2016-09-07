import React from 'react'
import Panel from './Panel'
import Divisor from './Divisor'
import styles from './styles.css'
// const styles = require('./styles.css')

const body = {
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  height: '100%',
  position: 'absolute',
  left: 0,
  right: 0,
  outline: 'none',
  overflow: 'hidden'
}

class Screen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      resize: false,
      x: 0,
      widthL: 0,
      widthR: 0,
      draggerWidth: 10
    }
    this.dragStart = this.dragStart.bind(this)
    // this.getWidth = this.getWidth.bind(this)
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
      this.setState({widthL: this.state.x - this.state.draggerWidth / 2})
      this.setState({widthR: window.innerWidth - this.state.x + this.state.draggerWidth / 2 })
      this.setState({x: e.clientX})
    }
  }

  dragRelease (e) {
    document.removeEventListener('mouseup', this.dragRelease)
    document.removeEventListener('mousemove', this.drag)
    this.setState({resize: false})
  }

  getWidth () {
    let widthLeft = this.refs.panelL.offsetWidth
    let widthRight = this.refs.panelR.offsetWidth

    this.setState({ widthL: widthLeft })
    this.setState({ widthR: widthRight })
  }

  componentWillMount () {
    let windowWidth = window.innerWidth
    this.setState({widthL: windowWidth / 2 - this.state.draggerWidth / 2})
    this.setState({widthR: windowWidth / 2 - this.state.draggerWidth / 2})
  }

  componentDidMount () {
    this.getWidth()
  }

  render () {
    // let stylesDivisor = styles
    // let divisorStyle = styles
    let styleL = {
      // flex: 1,
      // position: 'relative',
      // outline: 'none',
      width: this.state.widthL + 'px',
      height: 100 + '%'
    }
    let styleR = {
      // flex: 1,
      // position: 'relative',
      // outline: 'none',
      width: this.state.widthR + 'px',
      height: 100 + '%'
    }

    let draggerStyle = {
      width: 10 + 'px',
      height: 100 + '%',
      cursor: 'col-resize',
      backgroundColor: 'grey'
    }

    return (

      <div style={body}>
        <div style={styleL} ref='panelL'>
          {this.state.widthL}
        </div>
        <Divisor
          style={draggerStyle}
          className={styles.divisor}
          onMouseDown={this.dragStart}
          onMouseMove={this.drag}
          onMouseUp={this.dragRelease}>
          {this.props.children}
        </Divisor>
        <div style={styleR} ref='panelR'>
          {this.state.widthR}
        </div>
      </div>
    )
  }
}

export default Screen
