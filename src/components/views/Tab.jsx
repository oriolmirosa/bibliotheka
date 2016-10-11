import React, { Component } from 'react'
import store from '../../store'

class Tab extends Component {
  constructor (props) {
    super(props)

    this.select = this.select.bind(this)
  }

  select () {
    console.log(`select ${this.props.id} triggered`)
    store.dispatch({type: 'TAB_SELECTED', id: this.props.id})
  }

  render () {
    const tabStyle = {
			boxSizing: 'borderBox',
      display: 'inline-block',
      width: 75 + 'px',
      height: 100 + '%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'black',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
			borderBottomWidth: 1 + 'px',
      backgroundColor: '#fff',
      verticalAlign: 'top'
    }

    const tabStyleSelected = {
      display: 'inline-block',
      width: 75 + 'px',
      height: 100 + '%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'black',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
			borderBottomWidth: 0 + 'px',
      backgroundColor: '#fff',
      verticalAlign: 'top'
    }
    let style
		console.log(`this.props.selected: ${this.props.selected}`)
    if (this.props.selected) {
      style = tabStyleSelected
    } else {
      style = tabStyle
    }

    return (
      <div style={style} onClick={this.select}>
        <div key={this.props.id} style={{padding: 6, textAlign: 'center'}}>{this.props.id}</div>
      </div>
    )
  }
}

export default Tab
