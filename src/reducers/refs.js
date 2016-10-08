import { SELECT_REFERENCE } from '../constants/ActionTypes'
import References from '../../data/references'

const initialState = References.map((reference, index) => {
	const newReference = Object.assign({}, reference, index === 0 ? {selected: true} : {selected: false})
	return newReference
})

const refs = function (state = initialState, action) {
	switch(action.type) {
		case SELECT_REFERENCE:
			const newState = state.map(reference => {
				console.log(`action.reference: ${action.reference}`)
				console.log(`reference.id: ${reference.id}`)
				if (action.reference === reference.id) {
					reference.selected = true
				} else {
					reference.selected = false
				}
				return reference
			})
			return newState

		default:
			return state
	}
}

export default refs
