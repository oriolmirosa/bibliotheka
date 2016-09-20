import { NEW_POSITION, RESIZE_TOGGLE, VISIBLE_TOGGLE } from '../constants/ActionTypes'

const initialState = [
  {
    panel: 0,
    position: 0,
    resize: false,
    width: 100 + '%',
    height: 100,
    visible: 'block'
  },
  {
    panel: 1,
    position: 0,
    resize: false,
    width: 250,
    height: window.innerHeight - 100,
    visible: 'block'
  },
  {
    panel: 2,
    position: 0,
    resize: false,
    width: window.innerWidth - 400 - 250,
    height: 50 + '%',
    visible: 'block'
  },
  {
    panel: 3,
    position: 0,
    resize: false,
    width: window.innerWidth - 400 - 250,
    height: 50 + '%',
    visible: 'block'
  },
  {
    panel: 4,
    position: 0,
    resize: false,
    width: 400,
    height: window.innerHeight - 100,
    visible: 'block'
  }
]

const bibliotheka = function (state = initialState, action) {
  console.log('action.divisor: ' + action.divisor)
  switch (action.type) {
    case NEW_POSITION:
      return state.map((panel, index) => {
        let newHeight
        let newWidth
        if (action.divisor === 0 && index === 0) {
          newHeight = action.positionY
        }
        if (action.divisor === 0 && index === 1) {
          newHeight = window.innerHeight - action.positionY
        }
        if (action.divisor === 0 && index === 2) {
          let prop = state[2].height / (state[2].height + state[3].height)
          newHeight = prop * (window.innerHeight - action.positionY)
        }
        if (action.divisor === 0 && index === 3) {
          let prop = state[3].height / (state[2].height + state[3].height)
          newHeight = prop * (window.innerHeight - action.positionY)
        }
        if (action.divisor === 0 && index === 4) {
          newHeight = window.innerHeight - action.positionY
        }

        if (action.divisor === 1 && index === 1) {
          newWidth = action.positionX
        }

        if (action.divisor === 1 && (index === 2 || index === 3)) {
          newWidth = window.innerWidth - state[4].width - action.positionX
        }

        if (action.divisor === 2 && index === 2) {
          newHeight = action.positionY - state[0].height
        }

        if (action.divisor === 2 && index === 3) {
          newHeight = window.innerHeight - action.positionY
        }

        if (action.divisor === 3 && (index === 2 || index === 3)) {
          newWidth = (action.positionX - state[1].width)
        }
        if (action.divisor === 3 && index === 4) {
          newWidth = window.innerWidth - action.positionX
        }

        if (newHeight === undefined) {
          newHeight = panel.height
        }
        if (newWidth === undefined) {
          newWidth = panel.width
        }


          // if (index === 2) {
          //   if (state[3].visible === 'none') {
          //     newHeight = window.innerHeight - state[0].height
          //   } else {
          //     newHeight = action.position - state[0].height
          //   }
          // } else {
          //   newSize = action.positionY
          // }
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
          width: newWidth,
          height: newHeight
        })
        // if (index === 3 && action.divisor === 2) {
        //   let newSize3 = window.innerHeight - action.position
        //   return Object.assign({}, panel, {
        //     size: newSize3
        //   })
        // }
        // return panel
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
        if (index === 2 && action.panel === 3 & action.visible === 'none') {
          return Object.assign({}, panel, {
            size: window.innerHeight - state[0].size,
            position: state[2].size
          })
        }
        if (index === 3 && action.panel === 2 & action.visible === 'none') {
          return Object.assign({}, panel, {
            size: window.innerHeight - state[0].size
          })
        }
        if (index === 2 && action.panel === 3 & action.visible === 'block') {
          return Object.assign({}, panel, {
            size: state[2].position
          })
        }
        return panel
      })

    default:
      return state
  }
}

export default bibliotheka
