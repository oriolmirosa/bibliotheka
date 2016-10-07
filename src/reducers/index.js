import { combineReducers } from 'redux'
import panels from './panels'
import tabs from './tabs'

const reducers = combineReducers({panels: panels, tabs: tabs})

export default reducers
