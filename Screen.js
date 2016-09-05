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
      dragOffsetRight: 0,
      widthL: 0,
      widthR: 0,
      draggerWidth: 2,
      draggerLeft: window.innerWidth / 2
    }
    this.dragStart = this.dragStart.bind(this)
    this.getWidth = this.getWidth.bind(this)
    this.drag = this.drag.bind(this)
    this.dragRelease = this.dragRelease.bind(this)
  }

  dragStart (e) {
    this.setState({x: e.clientX})
    this.setState({dragOffsetLeft: this.state.widthL - this.state.x})
    this.setState({dragOffsetRight: this.state.widthR - this.state.x})
  }

  drag (e) {
    this.setState({x: e.clientX})
    let tmpLeft = this.state.dragOffsetLeft + this.state.x
    let tmpRight = this.state.dragOffsetRight - this.state.x
    if (tmpLeft < 30 || tmpRight < 30) {
      return
    }
    this.setState({widthL: tmpLeft})
    this.setState({widthR: tmpRight})
  }

  dragRelease (e) {
    this.setState({x: e.clientX})
  }

  getWidth () {
    let widthLeft = this.refs.panelL.offsetWidth
    let widthRight = this.refs.panelR.offsetWidth

    this.setState({ widthL: widthLeft })
    this.setState({ widthR: widthRight })
  }

  componentWillMount () {
    let windowWidth = window.innerWidth
    this.setState({widthL: windowWidth / 2 - 1})
    this.setState({widthR: windowWidth / 2 - 1})
  }

  componentDidMount () {
    this.getWidth()
  }

  render () {
    let styleL = {
      display: 'inline-block',
      width: this.state.widthL + 'px',
      height: 100 + '%'
    }
    let styleR = {
      display: 'inline-block',
      width: this.state.widthR + 'px',
      height: 100 + '%'
    }

    let draggerStyle = {
      left: this.state.draggerLeft,
      position: 'absolute',
      width: this.state.draggerWidth,
      height: 100 + '%',
      verticalAlign: 'top',
      cursor: 'col-resize',
      backgroundColor: 'grey'
    }

    return (

      <div style={body}>
        <span style={styleL} ref='panelL'>{this.state.widthL}</span>
        <span
          draggable='true'
          style={draggerStyle}
          onMouseDown={this.dragStart}
          onDrag={this.drag}
          onMouseUp={this.dragRelease}></span>
        <span style={styleR} ref='panelR'>{this.state.widthR}</span>
      </div>
    )
  }
}

export default Screen
