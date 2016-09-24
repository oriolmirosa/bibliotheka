import React from 'react'
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

  componentWillReceiveProps (newProps) {
    console.log(`willReceivedNewProps triggered`)
    if (newProps.height[1] !== this.props.height[1] && newProps.visible[1] !== this.props.visible[1] && newProps.resize === false) {
      store.dispatch({
        type: 'NEW_POSITION',
        divisor: 0,
        orientation: 'vertical',
        positionX: newProps.width[1],
        positionY: newProps.height[1] + newProps.height[0]
      })
    }
    if (newProps.width[2] !== this.props.width[2] && newProps.visible[2] !== this.props.visible[2] && newProps.resize === false) {
      store.dispatch({
        type: 'NEW_POSITION',
        divisor: 2,
        orientation: 'vertical',
        positionX: newProps.width[2],
        positionY: newProps.height[2]
      })
    }
    if (newProps.height[3] !== this.props.height[3] && newProps.visible[3] !== this.props.visible[3] && newProps.resize === false) {
      store.dispatch({
        type: 'NEW_POSITION',
        divisor: 3,
        orientation: 'vertical',
        positionX: newProps.width[4] + newProps.width[2],
        positionY: newProps.height[0] + newProps.height[1] + newProps.height[3]
      })
    }
    if (newProps.height[4] !== this.props.height[4] && newProps.visible[4] !== this.props.visible[4] && newProps.resize === false) {
      store.dispatch({
        type: 'NEW_POSITION',
        divisor: 3,
        orientation: 'vertical',
        positionX: newProps.width[3] + newProps.width[2],
        positionY: window.innerHeight - newProps.height[4]
      })
    }
    if (newProps.width[5] !== this.props.width[5] && newProps.visible[5] !== this.props.visible[5] && newProps.resize === false) {
      store.dispatch({
        type: 'NEW_POSITION',
        divisor: 4,
        orientation: 'vertical',
        positionX: window.innerWidth - newProps.width[5],
        positionY: window.innerHeight - newProps.height[5]
      })
    }
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
            <ToggleButton hidePanel={this.panelHide} panelId={1} panelName='Tabs' />
            <ToggleButton hidePanel={this.panelHide} panelId={2} panelName='Left' />
            <ToggleButton hidePanel={this.panelHide} panelId={3} panelName='Main' />
            <ToggleButton hidePanel={this.panelHide} panelId={4} panelName='PDF' />
            <ToggleButton hidePanel={this.panelHide} panelId={5} panelName='Right' />
          </div>
        </Panel>
        <Divisor divisor={0} orientation='horizontal' mousePushedDown={this.dragStart} />
        <Panel visible={this.props.visible[1]} height={this.props.height[1]} orientation='horizontal'>
          Tabs!
        </Panel>
        <Divisor divisor={1} visible={this.props.visible[1]} orientation='horizontal' mousePushedDown={this.dragStart} />
        <div className={styles.screenHor}>
          <Panel visible={this.props.visible[2]} width={this.props.width[2]} orientation='vertical'>
            <div>
              Left pane!
            </div>
          </Panel>
          <Divisor divisor={2} visible={this.props.visible[2]} orientation='vertical' mousePushedDown={this.dragStart} />
          <div className={styles.screenVer}>
            <PanelContainer ref='PanelContainer' height={window.innerHeight - this.props.height[0] - this.props.height[1]} width={Math.max(this.props.width[3], this.props.width[4])}>
              <Panel visible={this.props.visible[3]} height={this.props.height[3]} orientation='horizontal'>
                <div>
                  <ListView />
                </div>
              </Panel>
              <Divisor divisor={3} visible={this.props.visible[3] === 'none' || this.props.visible[4] === 'none' ? 'none' : 'block'} orientation='horizontal' mousePushedDown={this.dragStart} />
              <Panel visible={this.props.visible[4]} height={this.props.height[4]} orientation='horizontal'>
                <Viewer widthPdf={this.props.width[4]} />
              </Panel>
            </PanelContainer>
          </div>
          <Divisor divisor={4} visible={this.props.visible[5]} orientation='vertical' mousePushedDown={this.dragStart} />
          <Panel visible={this.props.visible[5]} width={this.props.width[5]} orientation='vertical'>
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
      store.bibliotheka[4].width,
      store.bibliotheka[5].width
    ],
    height: [
      store.bibliotheka[0].height,
      store.bibliotheka[1].height,
      store.bibliotheka[2].height,
      store.bibliotheka[3].height,
      store.bibliotheka[4].height,
      store.bibliotheka[5].height
    ],
    visible: [
      store.bibliotheka[0].visible,
      store.bibliotheka[1].visible,
      store.bibliotheka[2].visible,
      store.bibliotheka[3].visible,
      store.bibliotheka[4].visible,
      store.bibliotheka[5].visible
    ],
    defaultSize: [
      store.bibliotheka[0].defaultSize,
      store.bibliotheka[1].defaultSize,
      store.bibliotheka[2].defaultSize,
      store.bibliotheka[3].defaultSize,
      store.bibliotheka[4].defaultSize,
      store.bibliotheka[5].defaultSize
    ],
    resize: resize
  }
}

export default connect(mapStateToProps)(Root)
