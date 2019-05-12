import { SET_NETWORK_STATUS, SET_TOP_MESSAGE, CLEAR_TOP_MESSAGE } from './GlobalConstants'

export function setNetworkStatusAction (payload) {
  return {
    type: SET_NETWORK_STATUS,
    payload
  }
}
export function setTopMessageAction (payload) {
  return {
    type: SET_TOP_MESSAGE,
    payload
  }
}
export function clearTopMessageAction () {
  return {
    type: CLEAR_TOP_MESSAGE
  }
}
