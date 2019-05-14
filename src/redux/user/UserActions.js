import { ERROR_LOGIN, SET_ROLE, SET_SESSION, START_LOGIN, SUCCESS_LOGIN } from './UserConstants';
import { promiseListener } from '../../configs/redux/ConfigureStore'

export const loginAction = () => {
  return promiseListener.createAsyncFunction({
    start: START_LOGIN,
    resolve: SUCCESS_LOGIN,
    reject: ERROR_LOGIN
  })
}
export const successLoginAction = (payload) => {
  return {
    type: SUCCESS_LOGIN,
    payload
  }
}
export const errorLoginAction = (payload) => {
  return {
    type: ERROR_LOGIN,
    payload
  }
}


export const setSessionAction = (payload) => {
  return {
    type: SET_SESSION,
    payload
  }
}
export const setRoleAction = (payload) => {
  return {
    type: SET_ROLE,
    payload
  }
}
