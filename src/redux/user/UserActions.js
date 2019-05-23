// All actions related to user.
import { SET_ROLE, SET_SESSION, LOGIN, CLEAR_SESSION, LOGOUT } from './UserConstants'

export const loginAction = () => {
  return {
    type: LOGIN
  }
}

export const setSessionAction = (payload) => {
  return {
    type: SET_SESSION,
    payload
  }
}
export const clearSessionAction = () => {
  return {
    type: CLEAR_SESSION
  }
}
export const setRoleAction = (payload) => {
  return {
    type: SET_ROLE,
    payload
  }
}
export const logoutAction = () => {
  return {
    type: LOGOUT
  }
}
