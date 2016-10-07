import React, { Component } from 'react'
import ListItem from './ListItem.jsx'
import References from '../../../Data/references'

class ListView extends Component {
	constructor (props) {
		super(props)

		// this.selectedOpen = this.selectedOpen.bind(this)
	}

	// selectedOpen (id) {
	// 	console.log(`selectedOpen called with ${JSON.stringify(id, null, 4)}`)
	// }

  render () {
    const listItems = References.map((reference, index) => {
      return (
				<ListItem author={reference.author} year={reference.year} title={reference.title} publication={reference.publication} details={reference.details} pdf={reference.pdf} key={index} id={index} />
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
