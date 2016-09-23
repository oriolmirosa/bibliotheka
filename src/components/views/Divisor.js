import React from 'react'
import styles from '../../../public/css/styles.css'

class Divisor extends React.Component {

  render () {
    let divisorClass
    if (this.props.orientation === 'vertical') {
      divisorClass = styles.divisorVer
    } else {
      divisorClass = styles.divisorHor
    }

    return (
      <div style={{display: this.props.visible}} className={divisorClass} onMouseDown={(e) => this.props.mousePushedDown(e, this.props.divisor, this.props.orientation)} />
    )
  }
}

export default Divisor
