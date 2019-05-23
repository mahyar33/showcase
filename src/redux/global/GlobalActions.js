// All actions related to global store which behave like a bus event in all components.
import {
  SET_NETWORK_STATUS,
  SET_TOP_MESSAGE,
  CLEAR_TOP_MESSAGE,
  SET_NETWORK_FAILURE,
  CLEAR_NETWORK_FAILURE,
  CHECK_NETWORK_FAILURE
} from './GlobalConstants'

export function setNetworkStatusAction (payload) {
  return {
    type: SET_NETWORK_STATUS,
    payload
  }
}
export function setNetworkFailureAction (payload) {
  return {
    type: SET_NETWORK_FAILURE,
    payload
  }
}
export function checkNetworkFailureAction (payload) {
  return {
    type: CHECK_NETWORK_FAILURE,
    payload
  }
}
export function clearNetworkFailureAction () {
  return {
    type: CLEAR_NETWORK_FAILURE
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
