import React from 'react'

class Panel extends React.Component {

  render () {
    let stylePanel
    if (this.props.orientation === 'vertical') {
      stylePanel = {
        width: this.props.width,
        position: 'relative',
        outline: 'none',
        display: this.props.visible,
        overflowY: 'scroll'
      }
    } else {
      stylePanel = {
        height: this.props.height,
        position: 'relative',
        outline: 'none',
        display: this.props.visible,
        overflowY: 'scroll'
      }
    }

    return (
      <div style={stylePanel || {}}>
        {this.props.children}
      </div>
    )
  }
}

export default Panel
