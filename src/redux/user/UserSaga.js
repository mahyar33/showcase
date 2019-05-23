// Handles saga functions related to user.
/* global localStorage */
import { takeLatest, put, take, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE, push } from 'connected-react-router'
import { LOGIN, LOGOUT } from './UserConstants'
import { clearSessionAction, setSessionAction } from './UserActions'
import { emitter } from '../../configs/redux/Saga'

// `Auth` is set true in `localStorage` when user can login successfully.
// It leads user can visit private routes.
// Also sets session in redux which is used in [**Security**](../../configs/network/Security.html) and [**Gateway**](../../configs/network/Gateway.html).
export function * onLogin () {
  console.log('saga')
  emitter.emit(LOGIN, 'ok')
  localStorage.setItem('Auth', 'true')
  /*  yield put(successLoginAction('ok')) */
  yield put(setSessionAction('session'))
}

function * watchLogin () {
  while (true) {
    const watcher = yield takeLatest(LOGIN, onLogin)
    yield take(LOCATION_CHANGE)
    yield cancel(watcher)
  }
}
// Clears session and change route to login page onLogout.
export function * onLogout () {
  yield put(clearSessionAction())
  yield put(push('/login'))
}

function * watchLogout () {
  yield takeLatest(LOGOUT, onLogout)
}

export default [watchLogin(), watchLogout()]
