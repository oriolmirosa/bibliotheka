import React, { Component } from 'react'
import Tab from './Tab.jsx'
import TabSeparator from './TabSeparator.jsx'
import store from '../../store'
import { connect } from 'react-redux'

class TabList extends Component {
  render () {
    let stylePanel = {
      height: this.props.height,
      position: 'relative',
      outline: 'none',
      display: this.props.visible,
      overflowY: 'scroll'
    }

    let tabs = []
    for (let i = 0; i < this.props.tabs.length; i++) {
      tabs.push(<TabSeparator />)
      tabs.push(<Tab id={this.props.tabs[i].id} selected={this.props.tabs[i].selected} />)
    }

    let occupiedWidth = this.props.tabs.length * 80 // 75px for each tab and 5px for each separator
    tabs.push(<div style={{display: 'inline-block', borderWidth: 0, borderBottom: 1 + 'px', borderStyle: 'solid', borderColor: 'black', height: 100 + '%', width: window.innerWidth - occupiedWidth, backgroundColor: '#fff'}} />)

    return (
      <div style={stylePanel || {}}>
        {tabs}
      </div>
    )
  }
}

const mapStateToProps = function (store) {
	let height = store.panels[1].height
	let visible = store.panels[1].visible
	let tabs = store.tabs.tabs
	console.log(`tabs: ${JSON.stringify(tabs, null, 4)}`)
	return {
		tabs: tabs,
		height: height,
		visible: visible
	}
}

export default connect(mapStateToProps)(TabList)
