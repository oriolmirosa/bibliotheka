import React, { Component } from 'react'
import store from '../../store'

class Tab extends Component {
  constructor (props) {
    super(props)

    this.select = this.select.bind(this)
		this.close = this.close.bind(this)
  }

  select () {
    console.log(`select ${this.props.id} triggered`)
		if (this.props.id === 0) {
			if (this.props.selectedTab !== 0) {
				store.dispatch({
					type: 'VISIBLE_TOGGLE',
					panel: 2,
					visible: 'block'
				})
				store.dispatch({
					type: 'VISIBLE_TOGGLE',
					panel: 3,
					visible: 'block'
				})
			}
		} else {
			if (this.props.selectedTab === 0) {
				store.dispatch({
					type: 'VISIBLE_TOGGLE',
					panel: 2,
					visible: 'none'
				})
				store.dispatch({
					type: 'VISIBLE_TOGGLE',
					panel: 3,
					visible: 'none'
				})
			}
		}
    store.dispatch({type: 'TAB_SELECTED', id: this.props.id})
  }

	close (e) {
		e.stopPropagation()
		console.log(`close ${this.props.id} triggered`)
		store.dispatch({type: 'TAB_CLOSE', id: this.props.id})
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
      verticalAlign: 'top',
			cursor: 'default'
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
      verticalAlign: 'top',
			cursor: 'default'
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
        <div key={this.props.id} style={{padding: 6, textAlign: 'center', position: 'relative', cursor: 'default'}}>{this.props.id}<div onClick={this.close} style={{position: 'absolute', right: 0, top: 50 + '%', transform: 'translate(' + -50 + '%, ' + -50 + '%)', cursor: 'default'}}><span>x</span></div></div>
      </div>
    )
  }
}

export default Tab
