import { TAB_SELECTED, NEW_TAB, TAB_CLOSE } from '../constants/ActionTypes'

const initialState = {
	tabs: [
		{
			id: 0,
			reference: 0,
			title: 'Library',
			selected: true
		},
		{
			id: 1,
			reference: 1,
			title: 'Ref 1',
			selected: false,
		},
		{
			id: 2,
			reference: 2,
			title: 'Ref 2',
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
			const newState = Object.assign({}, state, {tabs: newStateTabs}, {selectedTab: action.id})
			return newState

		case NEW_TAB:
			const newStateTabs2 = state.tabs.map(tab => {
				const newTab2 = Object.assign({}, tab)
				newTab2.selected = false
				return newTab2
			})
			newStateTabs2.push({
				id: newStateTabs2.length,
				reference: action.reference,
				title: `Ref ${newStateTabs2.length}`,
				selected: true
			})
			const newState2 = Object.assign({}, state, {tabs: newStateTabs2}, {selectedTab: newStateTabs2.length - 1})
			return newState2

		case TAB_CLOSE:
			const newStateTabs3 = state.tabs.filter(tab => {
					if (action.id === tab.id - 1) {
						tab.selected = true
					}
				return tab.id !== action.id
			})
			const newState3 = Object.assign({}, state, {tabs: newStateTabs3}, {selectedTab: state.selectedTab - 1})
			console.log(`newState3: ${JSON.stringify(newState3)}`)
			return newState3

		default:
			return state
	}
}

export default tabs
