import React from 'react'
import SplitPane from './SplitPane.js'

class Root extends React.Component {

  render () {
    return (
      <div>
        <SplitPane id={0}>
          <div>
            Oriol rules!
          </div>
          <div>
            Oriol rules la la!
          </div>
        </SplitPane>
        <SplitPane id={1}>
          <div>
            La la!
          </div>
          <div>
            Lo lo
          </div>
        </SplitPane>
      </div>
    )
  }
}

export default Root
