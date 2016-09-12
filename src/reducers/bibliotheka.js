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
          return Object.assign({}, splitPane, {
            x: action.x,
            widthL: action.widthL
          })
        }
        return splitPane
      })

    case RESIZE_TOGGLE:
      return state.map((splitPane, index) => {
        if (index === action.id) {
          return Object.assign({}, splitPane, {
            resize: action.resize,
            x: action.x,
            widthL: action.widthL
          })
        }
        return splitPane
      })

    default:
      return state
  }
}

export default bibliotheka
