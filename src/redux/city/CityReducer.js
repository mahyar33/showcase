import { fromJS } from 'immutable'
import { CITY_LIST, CITY_LIST_ERROR, CITY_LIST_SUCCESSFUL, SET_CITY_LIST } from './CityConstants'

export const initialState = fromJS({
  list: {
    loading: false,
    success: false,
    error: false
  }
})

function CityReducer (state = initialState, action) {
  switch (action.type) {
    case SET_CITY_LIST:
      return state.setIn(['list', 'loading'], false)
        .setIn(['list', 'success'], action.payload)
        .setIn(['list', 'error'], false)
    case CITY_LIST:
      return state.setIn(['list', 'loading'], true)
        .setIn(['list', 'success'], false)
        .setIn(['list', 'error'], false)
    case CITY_LIST_SUCCESSFUL:
      return state.setIn(['list', 'loading'], false)
        .setIn(['list', 'success'], action.payload)
        .setIn(['list', 'error'], false)
    case CITY_LIST_ERROR:
      return state.setIn(['list', 'loading'], false)
        .setIn(['list', 'success'], false)
        .setIn(['list', 'error'], action.payload)
    default:
      return state
  }
}

export default CityReducer
