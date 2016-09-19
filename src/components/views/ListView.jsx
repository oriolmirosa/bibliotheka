import React, { Component } from 'react'
// import ListItems from './ListItems'
import References from '../../../Data/references'

class ListView extends Component {

  render () {
    const listItems = References.map((reference, index) => {
      return (
        <div style={{width: 100 + '%', height: 75}} key={index}>
          <span>{reference.author}</span>
          <span>{reference.year}</span>
          <span>{reference.title}</span>
          <span>{reference.publication}</span>
          <span>{reference.details}</span>
        </div>
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
