import React from 'react'

class Screen extends React.Component {
  render () {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    )
  }
}

export default Screen
