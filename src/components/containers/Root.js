import React from 'react'
import { connect } from 'react-redux'
import store from '../../store'
import PanelContainer from '../views/PanelContainer.jsx'
import Panel from '../views/Panel'
import Divisor from '../views/Divisor'
import ToggleButton from '../views/ToggleButton'
import ListView from '../views/ListView.jsx'
import Viewer from '../views/Viewer.jsx'
import TabList from '../views/TabList.jsx'
import Tab from '../views/Tab.jsx'
import TabSeparator from '../views/TabSeparator.jsx'
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
				<TabList visible={this.props.visible[1]} height={this.props.height[1]} />
        <Divisor divisor={1} visible='none' orientation='horizontal' mousePushedDown={this.dragStart} />
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
                <Viewer widthPdf={this.props.width[4]} visible={this.props.selected[0]} pdf={this.props.pdf[0]} tabID={this.props.tabID[0]} />
								<Viewer widthPdf={this.props.width[4]} visible={this.props.selected[1]} pdf={this.props.pdf[1]} tabID={this.props.tabID[1]} />
								<Viewer widthPdf={this.props.width[4]} visible={this.props.selected[2]} pdf={this.props.pdf[2]} tabID={this.props.tabID[2]} />
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
  if (store.panels[0].resize || store.panels[1].resize || store.panels[2].resize || store.panels[3].resize || store.panels[4].resize) {
    resize = true
  } else {
    resize = false
  }
	let selected = store.tabs.tabs.map(tab => tab.selected)
	let title = store.tabs.tabs.map(tab => tab.title)
	let pdf = store.tabs.tabs.map(tab => store.refs[tab.reference].pdf)
	let tabID = store.tabs.tabs.map(tab => tab.id)
  return {
    width: [
      store.panels[0].width,
      store.panels[1].width,
      store.panels[2].width,
      store.panels[3].width,
      store.panels[4].width,
      store.panels[5].width
    ],
    height: [
      store.panels[0].height,
      store.panels[1].height,
      store.panels[2].height,
      store.panels[3].height,
      store.panels[4].height,
      store.panels[5].height
    ],
    visible: [
      store.panels[0].visible,
      store.panels[1].visible,
      store.panels[2].visible,
      store.panels[3].visible,
      store.panels[4].visible,
      store.panels[5].visible
    ],
    defaultSize: [
      store.panels[0].defaultSize,
      store.panels[1].defaultSize,
      store.panels[2].defaultSize,
      store.panels[3].defaultSize,
      store.panels[4].defaultSize,
      store.panels[5].defaultSize
    ],
    resize: resize,
		selected: selected,
		title: title,
		pdf: pdf,
		tabID: tabID
  }
}

export default connect(mapStateToProps)(Root)
