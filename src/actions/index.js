import * as types from '../constants/ActionTypes'

export function newPosition (divisor, position, orientation) {
  return {type: types.NEW_POSITION, divisor: divisor, orientation: orientation, position: position}
}

export function resizeToggle (divisor, orientation, resize, position) {
  return {type: types.RESIZE_TOGGLE, divisor: divisor, orientation: orientation, resize: resize, position: position}
}

export function visibleToggle (panel, visible) {
  return {type: types.VISIBLE_TOGGLE, panel: panel, visible: visible}
}
