import React from 'react'

// let panel = {
//   display: 'inline-block',
//   width: 49.5 + '%',
//   height: 100 + '%',
//   backgroundColor: 'white'
// }

class Panel extends React.Component {

  render () {
    return (
      <div style={this.props.style || {}}>
        {this.props.children}
      </div>
    )
  }
}

export default Panel
