import { NEW_X, RESIZE_TOGGLE } from '../constants/ActionTypes'

const initialState = [
  {
    id: 0,
    x: 0,
    resize: false,
    widthL: 250
  },
  {
    id: 1,
    x: 0,
    resize: false,
    widthL: 500
  }
]

const bibliotheka = function (state = initialState , action) {
  // console.log(JSON.stringify(newState, null, 4))
  switch (action.type) {
    case NEW_X:
      return state.map((splitPane, index) => {
        if (index === action.id) {
          let newX = action.x
          let minDistance = 100
          if (action.id === 0) {
            if (newX <= minDistance) {
              newX = minDistance
            }
            if (newX >= state[action.id + 1].widthL - minDistance) {
              newX = state[action.id + 1].widthL - minDistance
            }
          } else if (action.id === state.length - 1) {
            if (newX <= state[action.id - 1].widthL + minDistance) {
              newX = state[action.id - 1].widthL + minDistance
            }
            if (newX >= window.innerWidth - minDistance) {
              newX = window.innerWidth - minDistance
            }
          } else {
            if (newX <= state[action.id - 1].widthL + minDistance) {
              newX = state[action.id - 1].widthL + minDistance
            }
            if (newX >= state[action.id + 1].widthL - minDistance) {
              newX = state[action.id + 1].widthL - minDistance
            }
          }
          return Object.assign({}, splitPane, {
            x: newX,
            widthL: newX
          })
        }
        return splitPane
      })

    case RESIZE_TOGGLE:
      return state.map((splitPane, index) => {
        if (index === action.id) {
          return Object.assign({}, splitPane, {
            resize: action.resize
          })
        }
        return splitPane
      })

    default:
      return state
  }
}

export default bibliotheka
