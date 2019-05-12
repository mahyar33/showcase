import { fromJS } from 'immutable'
import { SET_SESSION } from './UserConstants';

export const initialState = fromJS({

})

function UserReducer (state = initialState, action) {
  switch (action.type) {
    case SET_SESSION:
      return state.set('session', action.payload)
    default:
      return state
  }
}

export default UserReducer
