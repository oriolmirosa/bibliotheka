import React from 'react'
import { connect } from 'react-redux'
import store from '../../store'
import Panel from '../views/Panel'
import Divisor from '../views/Divisor'
import ToggleButton from '../views/ToggleButton'
import styles from '../../../public/css/styles.css'

class Root extends React.Component {
  constructor (props) {
    super(props)

    this.dragStart = this.dragStart.bind(this)
    this.drag = this.drag.bind(this)
    this.dragRelease = this.dragRelease.bind(this)
    this.panelHide = this.panelHide.bind(this)
  }

  dragStart (e, divisor, orientation) {
    console.log('divisor:' + divisor)
    let position
    if (orientation === 'horizontal') {
      position = e.clientY
    } else {
      position = e.clientX
    }
    console.log('position: ' + position)
    this.unFocus()

    store.dispatch({
      type: 'RESIZE_TOGGLE',
      divisor: divisor,
      orientation: orientation,
      resize: true,
      position: position
    })

    document.onmouseup = (g) => this.dragRelease(g, divisor, orientation)
    document.onmousemove = (g) => this.drag(g, divisor, orientation)
  }

  drag (e, divisor, orientation) {
    let position
    if (orientation === 'horizontal') {
      position = e.clientY
    } else {
      position = e.clientX
    }
    this.unFocus()
    if (this.props.resize) {
      store.dispatch({
        type: 'NEW_POSITION',
        divisor: divisor,
        orientation: orientation,
        position: position
      })
    }
  }

  dragRelease (e, divisor, orientation) {
    // console.log('dragRelease called')
    // document.removeEventListener('mouseup', (g) => this.dragRelease(g, divisor, orientation))
    // document.removeEventListener('mousemove', (g) => this.drag(g, divisor, orientation))
    store.dispatch({
      type: 'RESIZE_TOGGLE',
      divisor: divisor,
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

  panelHide (e, panel) {
    let visible
    if (this.props.visible[panel] === 'block') {
      visible = 'none'
    } else {
      visible = 'block'
    }
    store.dispatch({
      type: 'VISIBLE_TOGGLE',
      panel: panel,
      visible: visible
    })
  }

  render () {
    console.log('this.props.size: ' + this.props.size)
    console.log('this.props.resize: ' + this.props.resize)

    return (
      <div className={styles.main}>
        <Panel size={this.props.size[0]} orientation='horizontal'>
          <div>
            <ToggleButton hidePanel={this.panelHide} panelId={1} panelName='Left' />
            <ToggleButton hidePanel={this.panelHide} panelId={2} panelName='Main' />
            <ToggleButton hidePanel={this.panelHide} panelId={3} panelName='PDF' />
            <ToggleButton hidePanel={this.panelHide} panelId={4} panelName='Right' />
          </div>
        </Panel>
        <Divisor divisor={0} orientation='horizontal' mousePushedDown={this.dragStart} />
        <div className={styles.screenHor}>
          <Panel visible={this.props.visible[1]} size={this.props.size[1]} orientation='vertical'>
            <div>
              Left pane!
            </div>
          </Panel>
          <Divisor divisor={1} display={this.props.visible[1]} orientation='vertical' mousePushedDown={this.dragStart} />
          <div className={styles.screenVer}>
            <div style={{height: window.innerHeight - this.props.size[0]}}>
              <Panel visible={this.props.visible[2]} size={this.props.size[2]} orientation='horizontal'>
                <div>
                  Main pane!
                  <img src='../../../public/img/p1010001.jpg' alt='' style={{width: 100 + '%'}} />
                </div>
              </Panel>
              <Divisor divisor={2} display={this.props.visible[2] === 'none' || this.props.visible[3] === 'none' ? 'none' : 'block'} orientation='horizontal' mousePushedDown={this.dragStart} />
              <Panel visible={this.props.visible[3]} size={this.props.size[3]} orientation='horizontal'>
                <div>
                  PDF!
                  <img src='../../../public/img/p1010001.jpg' alt='' style={{width: 100 + '%', height: 100 + '%'}} />
                </div>
              </Panel>
            </div>
          </div>
          <Divisor divisor={4} display={this.props.visible[4]} orientation='vertical' mousePushedDown={this.dragStart} />
          <Panel visible={this.props.visible[4]} size={window.innerWidth - this.props.size[4]} orientation='vertical'>
            <div>
              Right pane!
            </div>
          </Panel>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function (store, ownProps) {
  let resize
  if (store.bibliotheka[0].resize || store.bibliotheka[1].resize || store.bibliotheka[2].resize || store.bibliotheka[3].resize || store.bibliotheka[4].resize) {
    resize = true
  } else {
    resize = false
  }
  return {
    size: [
      store.bibliotheka[0].size,
      store.bibliotheka[1].size,
      store.bibliotheka[2].size,
      store.bibliotheka[3].size,
      store.bibliotheka[4].size
    ],
    visible: [
      store.bibliotheka[0].visible,
      store.bibliotheka[1].visible,
      store.bibliotheka[2].visible,
      store.bibliotheka[3].visible,
      store.bibliotheka[4].visible
    ],
    defaultSize: [
      store.bibliotheka[0].defaultSize,
      store.bibliotheka[1].defaultSize,
      store.bibliotheka[2].defaultSize,
      store.bibliotheka[3].defaultSize,
      store.bibliotheka[4].defaultSize
    ],
    resize: resize
  }
}

export default connect(mapStateToProps)(Root)
