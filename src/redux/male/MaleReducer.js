// This reducer handles male store.
import { fromJS } from 'immutable'
import { MALE_LIST, MALE_LIST_ERROR, MALE_LIST_SUCCESSFUL } from './MaleConstants'

export const initialState = fromJS({
  list: {
    loading: false,
    success: false,
    error: false
  }
})

function MaleReducer (state = initialState, action) {
  switch (action.type) {
    case MALE_LIST:
      return state.setIn(['list', 'loading'], true)
        .setIn(['list', 'success'], false)
        .setIn(['list', 'error'], false)
    case MALE_LIST_SUCCESSFUL:
      return state.setIn(['list', 'loading'], false)
        .setIn(['list', 'success'], action.payload)
        .setIn(['list', 'error'], false)
    case MALE_LIST_ERROR:
      return state.setIn(['list', 'loading'], false)
        .setIn(['list', 'success'], false)
        .setIn(['list', 'error'], action.payload)
    default:
      return state
  }
}

export default MaleReducer
