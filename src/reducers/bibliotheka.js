import { NEW_POSITION, RESIZE_TOGGLE, VISIBLE_TOGGLE } from '../constants/ActionTypes'

const initialState = [
  {
    panel: 0,
    position: 0,
    resize: false,
    size: 100,
    visible: 'block'
  },
  {
    panel: 1,
    position: 0,
    resize: false,
    size: 250,
    visible: 'block'
  },
  {
    panel: 2,
    position: 0,
    resize: false,
    size: 50 + '%',
    visible: 'block'
  },
  {
    panel: 3,
    position: 0,
    resize: false,
    size: 50 + '%',
    visible: 'block'
  },
  {
    panel: 4,
    position: 0,
    resize: false,
    size: window.innerWidth - 400,
    visible: 'block'
  }
]

const bibliotheka = function (state = initialState , action) {
  console.log('action.divisor: ' + action.divisor)
  switch (action.type) {
    case NEW_POSITION:
      return state.map((panel, index) => {
        if (index === action.divisor) {
          let newSize = action.position
          // let minDistance = 100
          // if (action.id === 0) {
          //   if (newSize <= minDistance) {
          //     newSize = minDistance
          //   }
          //   if (newSize >= state[action.id + 1].widthL - minDistance) {
          //     newSize = state[action.id + 1].widthL - minDistance
          //   }
          // } else if (action.id === state.length - 1) {
          //   if (newSize <= state[action.id - 1].widthL + minDistance) {
          //     newSize = state[action.id - 1].widthL + minDistance
          //   }
          //   if (newSize >= window.innerWidth - minDistance) {
          //     newSize = window.innerWidth - minDistance
          //   }
          // } else {
          //   if (newSize <= state[action.id - 1].widthL + minDistance) {
          //     newSize = state[action.id - 1].widthL + minDistance
          //   }
          //   if (newSize >= state[action.id + 1].widthL - minDistance) {
          //     newSize = state[action.id + 1].widthL - minDistance
          //   }
          // }
          return Object.assign({}, panel, {
            size: newSize
          })
        }
        // if (index === action.divisor + 1) {
        return panel
      })

    case RESIZE_TOGGLE:
      return state.map((panel, index) => {
        if (index === action.divisor) {
          return Object.assign({}, panel, {
            resize: action.resize
          })
        }
        return panel
      })

    case VISIBLE_TOGGLE:
      return state.map((panel, index) => {
        if (index === action.panel) {
          return Object.assign({}, panel, {
            visible: action.visible
          })
        }
        return panel
      })

    default:
      return state
  }
}

export default bibliotheka
