import React from 'react'
import { connect } from 'react-redux'
import store from '../../store'
import Screen from '../views/Screen'
import Panel from '../views/Panel'
import Divisor from '../views/Divisor'
import styles from '../../../public/css/styles.css'

class SplitPane extends React.Component {

  constructor (props) {
    super(props)

    this.dragStart = this.dragStart.bind(this)
    this.drag = this.drag.bind(this)
    this.dragRelease = this.dragRelease.bind(this)
  }

  dragStart (e) {
    this.unFocus()
    document.addEventListener('mouseup', this.dragRelease, true)
    document.addEventListener('mousemove', this.drag, true)
    store.dispatch({
      type: 'RESIZE_TOGGLE',
      id: this.props.id,
      resize: true,
      x: e.clientX,
      widthL: e.clientX
    })
  }

  drag (e) {
    this.unFocus()
    if (this.props.resize) {
      store.dispatch({
        type: 'NEW_X',
        id: this.props.id,
        x: e.clientX,
        widthL: e.clientX
      })
    }
  }

  dragRelease (e) {
    console.log('dragRelease called')
    document.removeEventListener('mouseup', this.dragRelease)
    document.removeEventListener('mousemove', this.drag)
    store.dispatch({
      type: 'RESIZE_TOGGLE',
      id: this.props.id,
      resize: false
    })
  }

  unFocus () {
    if (document.selection) {
      document.selection.empty()
    } else {
      window.getSelection().removeAllRanges()
    }
  }

  render () {
    let styleL = {
      width: this.props.widthL + 'px',
      position: 'relative',
      outline: 'none'
    }

    let styleR = {
      position: 'flex',
      outline: 'none'
    }

    const children = this.props.children

    return (
      <Screen className={styles.screen}>
        <Panel style={styleL}>
          {children[0]}
        </Panel>
        <Divisor className={styles.divisor} mousePushedDown={this.dragStart} />
        <Panel style={styleR}>
          {children[1]}
        </Panel>
      </Screen>
    )
  }
}

const mapStateToProps = function (store, ownProps) {
  return {
    x: store.bibliotheka[ownProps.id].x,
    resize: store.bibliotheka[ownProps.id].resize,
    widthL: store.bibliotheka[ownProps.id].widthL
  }
}

export default connect(mapStateToProps)(SplitPane)
