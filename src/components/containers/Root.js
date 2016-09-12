import React from 'react'
import SplitPane from './SplitPane.js'

class Root extends React.Component {

  render () {
    return (
      <div>
        <SplitPane id={0}>
          <div>
            Left pane!
          </div>
          <div>
            Middle pane!
          </div>
        </SplitPane>
        <SplitPane id={1}>
          <div/>
          <div>
            Right pane!
          </div>
        </SplitPane>
      </div>
    )
  }
}

export default Root
