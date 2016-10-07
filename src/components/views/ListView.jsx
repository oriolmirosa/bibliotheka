import React, { Component } from 'react'
import ListItem from './ListItem.jsx'
import References from '../../../Data/references'

class ListView extends Component {
	constructor (props) {
		super(props)

		this.selectedOpen = this.selectedOpen.bind(this)
	}

	selectedOpen () {
		console.log(`selectedOpen called`)
	}

  render () {
    const listItems = References.map((reference, index) => {
      return (
				<ListItem author={reference.author} year={reference.year} title={reference.title} publication={reference.publication} details={reference.details} key={index} whenClicked={this.selectedOpen} />
      )
    })
    return (
      <div>
        {listItems}
      </div>
    )
  }
}

export default ListView
