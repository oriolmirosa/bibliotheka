import React from 'react'

let panel = {
  display: 'inline-block',
  width: 49.5 + '%',
  height: 100 + '%',
  backgroundColor: 'white'
}

class Panel extends React.Component {
  propTypes: {
  text: React.PropTypes.string
  }

  render () {
    return (
      <div style={panel}>
        {this.props.text}
      </div>
    )
  }
}

export default Panel
