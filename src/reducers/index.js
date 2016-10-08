import { combineReducers } from 'redux'
import panels from './panels'
import tabs from './tabs'
import refs from './refs'

const reducers = combineReducers({
	panels: panels,
	tabs: tabs,
	refs: refs
})

export default reducers
