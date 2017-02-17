import React from 'react'
import store from '../../store'
import { connect } from 'react-redux'

class ListItem extends React.Component {
	constructor (props) {
		super(props)

		this.select = this.select.bind(this)
		this.selectOpen = this.selectOpen.bind(this)
	}

	select () {
		store.dispatch({
			type: 'SELECT_REFERENCE',
			reference: this.props.id
		})
	}

	selectOpen () {
		this.select()
		store.dispatch({
			type: 'NEW_TAB',
			reference: this.props.id
		})
		if (this.props.id !== 0) {
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

	render () {
		console.log(this.props.selected[this.props.id])
		let backgroundColor = this.props.selected[this.props.id] === true ? 'grey' : 'white'
		return (
			<div style={{width: 100 + '%', height: 75, backgroundColor: backgroundColor}} onClick={this.select} onDoubleClick={this.selectOpen} >
				<span>{this.props.author[this.props.id]}.</span>&nbsp;
				<span>{this.props.year[this.props.id]}.</span>&nbsp;
				<span>{this.props.title[this.props.id]}.</span>&nbsp;
				<span>{this.props.publication[this.props.id]}.</span>&nbsp;
				<span>{this.props.details[this.props.id]}.</span>&nbsp;
				<span>URL: {this.props.pdf[this.props.id]}</span>
			</div>
		)
	}
}

const mapStateToProps = function (store) {
	let selected = store.refs.map(references => references.selected)
	let author = store.refs.map(references => references.author)
	let year = store.refs.map(references => references.year)
	let title = store.refs.map(references => references.title)
	let publication = store.refs.map(references => references.publication)
	let details = store.refs.map(references => references.details)
	let pdf = store.refs.map(references => references.pdf)
	return {
		selected: selected,
		author: author,
		year: year,
		title: title,
		publication: publication,
		details: details,
		pdf: pdf
	}
}

export default connect(mapStateToProps)(ListItem)
