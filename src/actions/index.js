import * as types from '../constants/ActionTypes'

export function newPosition (divisor, positionX, positionY, orientation) {
  return {type: types.NEW_POSITION, divisor: divisor, orientation: orientation, positionX: positionX, positionY: positionY}
}

export function resizeToggle (divisor, orientation, resize, positionX, positionY) {
  return {type: types.RESIZE_TOGGLE, divisor: divisor, orientation: orientation, resize: resize, positionX: positionX, positionY: positionY}
}

export function visibleToggle (panel, visible) {
  return {type: types.VISIBLE_TOGGLE, panel: panel, visible: visible}
}

export function tabSelected (id) {
	return {type: types.TAB_SELECTED, id: id}
}

export function selectReference (reference) {
	return {type: types.SELECT_REFERENCE, reference: reference}
}

export function newTab (reference) {
	return {type: types.NEW_TAB, reference: reference}
}
