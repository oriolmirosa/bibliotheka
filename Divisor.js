import React from 'react'

class Divisor extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div style={this.props.divisor} onMouseDown={this.props.dragStart}>
      </div>
    )
  }
}

Divisor.propTypes = {
  divisor: React.PropTypes.object
}

Divisor.defaultProps = {
  divisor: {
    display: 'inline-block',
    width: 10,
    height: 100 + '%',
    backgroundColor: 'grey',
    cursor: 'col-resize'
  }
}

export default Divisor
