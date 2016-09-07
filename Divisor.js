import React from 'react'

class Divisor extends React.Component {

  constructor (props) {
    super(props)

  // this.props.dragStart = this.props.dragStart.bind(this)
  // this.props.drag = this.props.drag.bind(this)
  // this.props.dragRelease = this.props.dragRelease.bind(this)
  }

  dragStart (e) {
    this.props.dragStart(e)
  }

  drag (e) {
    this.props.drag(e)
  }

  dragRelease (e) {
    this.props.dragRelease(e)
  }

  render () {
    return (
      <div
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.dragStart}
        onMouseMove={this.props.drag}
        onMouseUp={this.props.dragRelease} />
    )
  }
}

// Divisor.propTypes = {
//   dragStart: React.PropTypes.func.isRequired,
//   drag: React.PropTypes.func.isRequired,
//   dragRelease: React.PropTypes.func.isRequired,
//   className: React.PropTypes.string.isRequired
// }

export default Divisor
