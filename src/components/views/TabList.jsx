import React, { Component } from 'react'
import TabSeparator from './TabSeparator.jsx'

class TabList extends Component {
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

    let children = this.props.children

    let tabs = []
    for (let i = 0; i < children.length; i++) {
      tabs.push(<TabSeparator />)
      tabs.push(children[i])
    }

    let occupiedWidth = children.length * 80 // 75px for each tab and 5px for each separator
    tabs.push(<div style={{display: 'inline-block', borderWidth: 0, borderBottom: 1 + 'px', borderStyle: 'solid', borderColor: 'black', height: 100 + '%', width: window.innerWidth - occupiedWidth, backgroundColor: '#fff'}} />)

    return (
      <div style={stylePanel || {}}>
        {tabs}
      </div>
    )
  }
}

export default TabList
