import React from 'react'

class Divisor extends React.Component {

  render () {
    return (
      <div className={this.props.className} onMouseDown={this.props.mousePushedDown} />
    )
  }
}

export default Divisor
