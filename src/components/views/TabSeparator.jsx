import React, { Component } from 'react'

class TabSeparator extends Component {
  render () {
    return (
      <div style={{display: 'inline-block', borderWidth: 0, borderBottom: 1 + 'px', borderStyle: 'solid', borderColor: 'black', height: 100 + '%', width: 5 + 'px', backgroundColor: '#fff'}} />
    )
  }
}

export default TabSeparator
