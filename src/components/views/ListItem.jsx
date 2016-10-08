import React from 'react'
import store from '../../store'
import { connect } from 'react-redux'

class ListItem extends React.Component {
	constructor (props) {
		super(props)

		this.selectOpen = this.selectOpen.bind(this)
	}

	selectOpen () {
		console.log(`selectOpen called with ${JSON.stringify(this.props.id, null, 4)}`)
		store.dispatch({
			type: 'SELECT_REFERENCE',
			reference: this.props.id
		})
	}

	render () {
		console.log(this.props.selected[this.props.id])
		let backgroundColor = this.props.selected[this.props.id] === true ? 'grey' : 'white'
		return (
			<div style={{width: 100 + '%', height: 75, backgroundColor: backgroundColor}} onClick={this.selectOpen}>
				<span>{this.props.author}.</span>&nbsp;
				<span>{this.props.year}.</span>&nbsp;
				<span>{this.props.title}.</span>&nbsp;
				<span>{this.props.publication}.</span>&nbsp;
				<span>{this.props.details}.</span>&nbsp;
				<span>URL: {this.props.pdf}</span>
			</div>
		)
	}
}

const mapStateToProps = function (store) {
	let refs = store.refs.map(references => references.selected)
	return {
		selected: refs
	}
}

export default connect(mapStateToProps)(ListItem)
