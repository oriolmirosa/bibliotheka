import React, { Component } from 'react'

class PanelContainer extends Component {
  render () {
    // let width = React
    return (
      <div style={{height: this.props.height, width: this.props.width}} ref='hola'>
        {this.props.children}
      </div>
    )
  }
}

export default PanelContainer
