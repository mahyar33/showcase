// This reducer handles female store.
import { fromJS } from 'immutable'
import { SET_FEMALE_LIST } from './FemaleConstants'

export const initialState = fromJS({
  list: {
    loading: false,
    success: false,
    error: false
  }
})

function FemaleReducer (state = initialState, action) {
  switch (action.type) {
    case SET_FEMALE_LIST:
      return state.setIn(['list', 'loading'], true)
        .setIn(['list', 'success'], action.payload)
        .setIn(['list', 'error'], false)
    default:
      return state
  }
}

export default FemaleReducer
