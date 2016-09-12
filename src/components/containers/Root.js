import React from 'react'
import SplitPane from './SplitPane.js'
import SplitPaneFixed from './SplitPaneFixed.js'

class Root extends React.Component {

  render () {
    return (
      <div>
        <SplitPaneFixed height={100} orientation='horizontal'>
          <div>
            Top pane!
          </div>
          <SplitPane id={0} orientation='vertical'>
            <div>
              Left pane!
            </div>
            <div>
              Middle pane!
            </div>
          </SplitPane>
          <SplitPane id={1} orientation='vertical'>
            <div />
            <div>
              Right pane!
            </div>
          </SplitPane>
        </SplitPaneFixed>
      </div>
    )
  }
}

export default Root
