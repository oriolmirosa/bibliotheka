import { TAB_SELECTED } from '../constants/ActionTypes'

const initialState = {
	tabs: [
		{
			id: 0,
			title: 'Library',
			selected: true
		},
		{
			id: 1,
			title: 'Library',
			selected: false
		},
		{
			id: 2,
			title: 'Library',
			selected: false
		}
	],
	selectedTab: 0
}

const tabs = function (state = initialState, action) {
	switch (action.type) {
		case TAB_SELECTED:
			const newStateTabs = state.tabs.map((tab) => {
				const newTab = Object.assign({}, tab)
				if (tab.id === action.id) {
					newTab.selected = true
				} else {
					newTab.selected = false
				}
				return newTab
			})
			console.log(`newStateTabs: ${newStateTabs}`)
			const newState = Object.assign({}, state, {tabs: newStateTabs}, {selectedTab: action.id})
			console.log(`newState: ${JSON.stringify(newState)}`)
			return newState

		// case TAB_CREATED:

		default:
			return state
	}
}

export default tabs
