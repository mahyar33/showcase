/**
 * Gets the repositories of the user from Github
 */

import { takeLatest, put, take, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import { START_LOGIN } from './UserConstants'
import { successLoginAction, setSessionAction } from './UserActions'

/**
 * Github repos request/response handler
 */
export function * loginSaga () {
  // Select username from store
  console.log('saga')
  yield put(successLoginAction('ok'))
  yield put(setSessionAction('session'))
}

/**
 * Root saga manages watcher lifecycle
 */
function * watchUser () {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  while (true) {
    const watcher = yield takeLatest(START_LOGIN, loginSaga)
    yield take(LOCATION_CHANGE)
    yield cancel(watcher)
  }
}

export default [watchUser()]
