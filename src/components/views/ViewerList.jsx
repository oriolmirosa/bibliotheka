import React from 'react'
import Viewer from './Viewer.jsx'

class ViewerList extends React.component {
	constructor(props) {
		super(props)
	}

	render() {

		return (
			<div>
				{viewers}
			</div>
		)
	}
}
