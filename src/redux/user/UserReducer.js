// This reducer handles user store.
import { fromJS } from 'immutable'
import { SET_ROLE, SET_SESSION, CLEAR_SESSION } from './UserConstants'

export const initialState = fromJS({

})

function UserReducer (state = initialState, action) {
  switch (action.type) {
    case SET_SESSION:
      return state.set('session', action.payload)
    case CLEAR_SESSION:
      return state.set('session', '')
    case SET_ROLE:
      return state.set('role', action.payload)
    default:
      return state
  }
}

export default UserReducer
