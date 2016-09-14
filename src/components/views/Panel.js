import React from 'react'

class Panel extends React.Component {

  render () {
    let styleLVert = {
      width: this.props.size,
      position: 'relative',
      outline: 'none',
      display: this.props.visible
    }

    let styleLHoriz = {
      height: this.props.size,
      position: 'relative',
      outline: 'none',
      display: this.props.visible
    }

    let styleL
    if (this.props.orientation === 'horizontal') {
      styleL = styleLHoriz
    } else {
      styleL = styleLVert
    }

    return (
      <div style={styleL || {}}>
        {this.props.children}
      </div>
    )
  }
}

export default Panel
