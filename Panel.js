import React from 'react'

let panel = {
  display: 'inline-block',
  width: 49.5 + '%',
  height: 100 + '%',
  backgroundColor: 'white'
}

class Panel extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div style={panel}>
        {this.props.width}
      </div>
    )
  }
}

Panel.propTypes = {
  width: React.PropTypes.number
}

Panel.defaultProps = {
  width: 100
}

export default Panel
