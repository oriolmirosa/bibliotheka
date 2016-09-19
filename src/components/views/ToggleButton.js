import React, { Component } from 'react'

export default class ToggleButton extends Component {

  render () {
    return (
      <button onClick={(e) => this.props.hidePanel(e, this.props.panelId)}>Toggle {this.props.panelName}</button>
    )
  }
}
