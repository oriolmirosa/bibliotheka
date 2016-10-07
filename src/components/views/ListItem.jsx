import React from 'react'

class ListItem extends React.Component {
	constructor (props) {
		super(props)

		this.selectOpen = this.selectOpen.bind(this)
	}

	selectOpen () {
		console.log(`selectOpen called with ${JSON.stringify(this.props.id, null, 4)}`)
	}

	render () {
		return (
			<div style={{width: 100 + '%', height: 75}} onClick={this.selectOpen}>
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

export default ListItem
