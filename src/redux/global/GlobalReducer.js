import { fromJS } from 'immutable'

import { networkStatus } from './constants'

export const initialState = fromJS({

})

function global (state = initialState, action) {
  switch (action.type) {
    case networkStatus:
      return state.set('network', action.payload)
    default:
      return state
  }
}

export default global
