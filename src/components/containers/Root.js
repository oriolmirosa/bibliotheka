import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import store from '../../store'
import PanelContainer from '../views/PanelContainer.jsx'
import Panel from '../views/Panel'
import Divisor from '../views/Divisor'
import ToggleButton from '../views/ToggleButton'
import ListView from '../views/ListView.jsx'
import Viewer from '../views/Viewer.jsx'
import styles from '../../../public/css/styles.css'

class Root extends React.Component {
  constructor (props) {
    super(props)

    this.dragStart = this.dragStart.bind(this)
    this.drag = this.drag.bind(this)
    this.dragRelease = this.dragRelease.bind(this)
    this.panelHide = this.panelHide.bind(this)
  }

  viewerResized () {
    console.log('viewerResized triggered')
  }

  dragStart (e, divisor, orientation) {
    console.log('divisor:' + divisor)
    let positionY = e.clientY
    let positionX = e.clientX
    this.unFocus()

    store.dispatch({
      type: 'RESIZE_TOGGLE',
      divisor: divisor,
      orientation: orientation,
      resize: true,
      positionX: positionX,
      positionY: positionY
    })

    let lala = (g) => this.dragRelease(g, divisor, orientation, lala, lolo)
    let lolo = (g) => this.drag(g, divisor, orientation)

    document.addEventListener('mouseup', lala)
    document.addEventListener('mousemove', lolo)
  }

  drag (e, divisor, orientation) {
    let positionY = e.clientY
    let positionX = e.clientX
    this.unFocus()
    if (this.props.resize) {
      store.dispatch({
        type: 'NEW_POSITION',
        divisor: divisor,
        orientation: orientation,
        positionX: positionX,
        positionY: positionY
      })
    }
  }

  dragRelease (e, divisor, orientation, lala, lolo) {
    // console.log('dragRelease called')
    document.removeEventListener('mouseup', lala)
    document.removeEventListener('mousemove', lolo)
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
    return (
      <div className={styles.main}>
        <Panel height={this.props.height[0]} orientation='horizontal'>
          <div>
            <ToggleButton hidePanel={this.panelHide} panelId={1} panelName='Left' />
            <ToggleButton hidePanel={this.panelHide} panelId={2} panelName='Main' />
            <ToggleButton hidePanel={this.panelHide} panelId={3} panelName='PDF' />
            <ToggleButton hidePanel={this.panelHide} panelId={4} panelName='Right' />
          </div>
        </Panel>
        <Divisor divisor={0} orientation='horizontal' mousePushedDown={this.dragStart} />
        <div className={styles.screenHor}>
          <Panel visible={this.props.visible[1]} width={this.props.width[1]} orientation='vertical'>
            <div>
              Left pane!
            </div>
          </Panel>
          <Divisor divisor={1} display={this.props.visible[1]} orientation='vertical' mousePushedDown={this.dragStart} />
          <div className={styles.screenVer}>
            <PanelContainer ref='PanelContainer' height={window.innerHeight - this.props.height[0]} width={this.props.width[3]}>
              <Panel visible={this.props.visible[2]} height={this.props.height[2]} orientation='horizontal'>
                <div>
                  <ListView />
                </div>
              </Panel>
              <Divisor divisor={2} display={this.props.visible[2] === 'none' || this.props.visible[3] === 'none' ? 'none' : 'block'} orientation='horizontal' mousePushedDown={this.dragStart} />
              <Panel visible={this.props.visible[3]} height={this.props.height[3]} orientation='horizontal'>
                <Viewer widthPdf={this.props.width[3]} />
              </Panel>
            </PanelContainer>
          </div>
          <Divisor divisor={3} display={this.props.visible[4]} orientation='vertical' mousePushedDown={this.dragStart} />
          <Panel visible={this.props.visible[4]} width={this.props.width[4]} orientation='vertical'>
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
    width: [
      store.bibliotheka[0].width,
      store.bibliotheka[1].width,
      store.bibliotheka[2].width,
      store.bibliotheka[3].width,
      store.bibliotheka[4].width
    ],
    height: [
      store.bibliotheka[0].height,
      store.bibliotheka[1].height,
      store.bibliotheka[2].height,
      store.bibliotheka[3].height,
      store.bibliotheka[4].height
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
