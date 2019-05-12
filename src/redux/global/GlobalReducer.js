import { fromJS } from 'immutable'

import { SET_NETWORK_STATUS, SET_TOP_MESSAGE, CLEAR_TOP_MESSAGE } from './GlobalConstants'

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
    default:
      return state
  }
}

export default globalReducer
