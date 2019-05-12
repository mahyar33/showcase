/**
 * Gets the repositories of the user from Github
 */

import { takeLatest, put } from 'redux-saga/effects'

import { START_LOGIN } from './UserConstants'
import { successLoginAction, setSession } from './UserActions'

/**
 * Github repos request/response handler
 */
export function * loginSaga () {
  // Select username from store
  console.log('saga')
  yield put(successLoginAction('ok'))
  yield put(setSession('session'))
}

/**
 * Root saga manages watcher lifecycle
 */
export default function * onLoginSaga () {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  yield takeLatest(START_LOGIN, loginSaga)
}
