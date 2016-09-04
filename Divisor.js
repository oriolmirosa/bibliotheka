import React from 'react'

class Divisor extends React.Component {
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
    this.setState({dragOffsetLeft: this.offsetWidth - this.state.x})
    this.setState({dragOffsetRight: this.offsetWidth - this.state.x})

    console.log(this.state.dragOffsetLeft)
  }

  render () {
    return (
      <div style={this.props.divisor} onMouseDown={this.dragStart}>
        {this.state.x}
      </div>
    )
  }
}

Divisor.propTypes = {
  divisor: React.PropTypes.object
}

Divisor.defaultProps = {
  divisor: {
    display: 'inline-block',
    width: 1,
    height: 100 + '%',
    backgroundColor: 'grey',
    cursor: 'col-resize'
  }
}

export default Divisor
