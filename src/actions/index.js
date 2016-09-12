import * as types from '../constants/ActionTypes'

export function newX (id, x) {
  return {type: types.NEW_X, id: id, x: x}
}

export function resizeToggle (id, resize) {
  return {type: types.RESIZE_TOGGLE, id: id, resize: resize}
}

export function newWidthL (id, widthL) {
  return {type: types.NEW_WIDTHL, id: id, widthL: widthL}
}
