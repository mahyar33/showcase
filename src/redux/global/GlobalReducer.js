import { fromJS } from 'immutable'

import {
  SET_NETWORK_STATUS,
  SET_TOP_MESSAGE,
  CLEAR_TOP_MESSAGE,
  SET_NETWORK_FAILURE, CLEAR_NETWORK_FAILURE
} from './GlobalConstants'

export const initialState = fromJS({

})

function globalReducer (state = initialState, action) {
  switch (action.type) {
    case SET_NETWORK_STATUS:
      return state.set('networkStatus', action.payload)
    case SET_TOP_MESSAGE:
      return state.set('topMessage', action.payload)
    case CLEAR_TOP_MESSAGE:
      return state.set('topMessage', '')
    case SET_NETWORK_FAILURE:
      return state.set('networkFailure', [...state.get('networkFailure'), action.payload])
    case CLEAR_NETWORK_FAILURE:
      return state.set('networkFailure', '')
    default:
      return state
  }
}

export default globalReducer
