/* global localStorage */
/**
 * Gets the repositories of the user from Github
 */
import { takeLatest, put, take, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE, push } from 'connected-react-router'
import { LOGIN, LOGOUT } from './UserConstants'
import { clearSessionAction, setSessionAction } from './UserActions'
import { emitter } from '../../configs/redux/Saga'

export function * onLogin () {
  console.log('saga')
  emitter.emit(LOGIN, 'ok', 'no')
  localStorage.setItem('Auth', 'true')
  /*  yield put(successLoginAction('ok')) */
  yield put(setSessionAction('session'))
}

/**
 * Root saga manages watcher lifecycle
 */
function * watchLogin () {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
/*  yield fork(citySocketSaga) */
  while (true) {
    const watcher = yield takeLatest(LOGIN, onLogin)
    yield take(LOCATION_CHANGE)
    yield cancel(watcher)
  }
}
export function * onLogout () {
  yield put(clearSessionAction())
  yield put(push('/login'))
}

function * watchLogout () {
  yield takeLatest(LOGOUT, onLogout)
}

export default [watchLogin(), watchLogout()]
