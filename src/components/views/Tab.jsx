import React, { Component } from 'react'

class Tab extends Component {
  constructor (props) {
    super(props)

    this.select = this.select.bind(this)
  }

  select () {
    console.log('select triggered')
    if (this.props.selected === 'no') {
      this.props.selected = 'yes'
    }
  }

  render () {
    const tabStyle = {
      display: 'inline-block',
      width: 75 + 'px',
      height: 100 + '%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'black',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottom: 0 + 'px',
      backgroundColor: '#fff',
      verticalAlign: 'top'
    }

    const tabStyleSelected = {
      display: 'inline-block',
      width: 75 + 'px',
      height: 100 + '%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'black',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      backgroundColor: '#fff',
      verticalAlign: 'top'
    }
    let style
    if (this.props.selected === 'yes') {
      style = tabStyle
    } else {
      style = tabStyleSelected
    }

    return (
      <div style={style} onClick={this.select}>
        <div style={{padding: 6, textAlign: 'center'}}>{this.props.title}</div>
      </div>
    )
  }
}

export default Tab