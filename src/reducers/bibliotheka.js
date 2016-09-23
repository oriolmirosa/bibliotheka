import { NEW_POSITION, RESIZE_TOGGLE, VISIBLE_TOGGLE } from '../constants/ActionTypes'

const initHeight0 = 100
const initHeight1 = 30
const initWidth2 = 225
const initWidth5 = 400

const initialState = [
  {
    panel: 0,
    position: 0,
    resize: false,
    width: 100 + '%',
    height: initHeight0,
    visible: 'block'
  },
  {
    panel: 1,
    position: 0,
    resize: false,
    width: 100 + '%',
    height: initHeight1,
    visible: 'block'
  },
  {
    panel: 2,
    position: 0,
    resize: false,
    width: initWidth2,
    height: window.innerHeight - initHeight0 - initHeight1,
    visible: 'block'
  },
  {
    panel: 3,
    position: 0,
    resize: false,
    width: window.innerWidth - initWidth5 - initWidth2,
    height: 50 + '%',
    visible: 'block'
  },
  {
    panel: 4,
    position: 0,
    resize: false,
    width: window.innerWidth - initWidth5 - initWidth2,
    height: 50 + '%',
    visible: 'block'
  },
  {
    panel: 5,
    position: 0,
    resize: false,
    width: initWidth5,
    height: window.innerHeight - initHeight0 - initHeight1,
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
          newHeight = window.innerHeight - action.positionY - state[2].height
        }
        if (action.divisor === 1 && index === 1) {
          newHeight = action.positionY - state[0].height
        }
        if (action.divisor === 1 && index === 2) {
          newHeight = window.innerHeight - action.positionY
        }
        if (action.divisor === 1 && index === 3) {
          let prop = state[3].height / (state[3].height + state[4].height)
          newHeight = prop * (window.innerHeight - action.positionY)
        }
        if (action.divisor === 1 && index === 4) {
          let prop = state[4].height / (state[3].height + state[4].height)
          newHeight = prop * (window.innerHeight - action.positionY)
        }
        if (action.divisor === 1 && index === 5) {
          newHeight = window.innerHeight - action.positionY
        }

        if (action.divisor === 2 && index === 2) {
          newWidth = action.positionX
        }

        if (action.divisor === 2 && (index === 3 || index === 4)) {
          newWidth = window.innerWidth - state[5].width - action.positionX
        }

        if (action.divisor === 3 && index === 3) {
          newHeight = action.positionY - state[0].height - state[1].height
        }

        if (action.divisor === 3 && index === 4) {
          newHeight = window.innerHeight - action.positionY
        }

        if (action.divisor === 4 && (index === 3 || index === 4)) {
          newWidth = (action.positionX - state[2].width)
        }
        if (action.divisor === 4 && index === 5) {
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
        if (action.panel === 1 && (index === 2 || index === 5)) {
          return Object.assign({}, panel, {
            height: window.innerHeight - state[0].height
          })
        }
        if (action.panel === 1 && index === 4) {
          return Object.assign({}, panel, {
            height: window.innerHeight - state[4].height + state[1].height
          })
        }
        if (action.panel === 2 && (index === 3 || index === 4)) {
          return Object.assign({}, panel, {
            width: window.innerWidth - state[5].width
          })
        }


        // if (index === 2 && action.panel === 3 & action.visible === 'none') {
        //   return Object.assign({}, panel, {
        //     size: window.innerHeight - state[0].size,
        //     position: state[2].size
        //   })
        // }
        // if (index === 3 && action.panel === 2 & action.visible === 'none') {
        //   return Object.assign({}, panel, {
        //     size: window.innerHeight - state[0].size
        //   })
        // }
        // if (index === 2 && action.panel === 3 & action.visible === 'block') {
        //   return Object.assign({}, panel, {
        //     size: state[2].position
        //   })
        // }
        return panel
      })

    default:
      return state
  }
}

export default bibliotheka
