import * as types from '../constants/ActionTypes'

export function addTodo (text) {
  return {type: types.ADD_TODO, text}
}

export function deleteTodo (text) {
  return {type: types.DELETE_TODO, text}
}
