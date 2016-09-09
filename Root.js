import React from 'react'
import SplitPane from './SplitPane.js'

class Root extends React.Component {
  render () {
    return (
      <div>
        <SplitPane widthL={250}>
          <div style={{display: 'flex'}}>
            Oriol rules!
          </div>
          <div>
            Oriol rules!
          </div>
        </SplitPane>
        <SplitPane widthL={750}>
          <div />
          <div>
            Yes he does!
          </div>
        </SplitPane>
      </div>
    )
  }
}

export default Root
