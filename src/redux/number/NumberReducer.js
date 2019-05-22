import { fromJS } from 'immutable'
import { NUMBER_LIST } from './NumberConstants'

export const initialState = fromJS({

})

function NumberReducer (state = initialState, action) {
  switch (action.type) {
    case NUMBER_LIST:
      return state.set('list', action.payload)
    default:
      return state
  }
}

export default NumberReducer
