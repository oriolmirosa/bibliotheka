import { ADD_TODO, DELETE_TODO } from '../constants/ActionTypes'

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

export default function bibliotheka (state = initialState , action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        {
          id: 1,
          completed: false,
          text: action.text
        },
        ...state
      ]

    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id
      )

    default:
      return state
  }
}
