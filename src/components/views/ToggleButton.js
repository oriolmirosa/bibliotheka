import React, { Component } from 'react'

export default class ToggleButton extends Component {

  render () {
    console.log('panelId: ' + this.props.panelId)
    return (
      <button onClick={(e) => this.props.hidePanel(e, this.props.panelId)}>Toggle {this.props.panelName}</button>
    )
  }
}
