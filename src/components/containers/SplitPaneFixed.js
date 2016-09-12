import React from 'react'
import Screen from '../views/Screen'
import Panel from '../views/Panel'
import Divisor from '../views/Divisor'
import styles from '../../../public/css/styles.css'

class SplitPaneFixed extends React.Component {

  render () {
    let styleLVert = {
      width: this.props.width + 'px',
      position: 'relative',
      outline: 'none'
    }

    let styleLHoriz = {
      height: this.props.height + 'px',
      width: 100 + '%',
      position: 'relative',
      outline: 'none'
    }

    let styleL
    console.log(`this.props.orientation: ${this.props.orientation}`)
    if (this.props.orientation === 'horizontal') {
      styleL = styleLHoriz
    } else {
      styleL = styleLVert
    }

    let styleR = {
      position: 'relative',
      outline: 'none',
      height: 100 + '%'
    }

    const children = this.props.children
    const classes = [styles.divisor, styles.divisor.horizontal]

    return (
      <Screen className={styles.screenVer}>
        <Panel style={styleL}>
          {children[0]}
        </Panel>
        <Divisor className={styles.divisorHor} />
        <Panel style={styleR}>
          {children[1]}
          {children[2]}
        </Panel>
      </Screen>
    )
  }
}

export default SplitPaneFixed
