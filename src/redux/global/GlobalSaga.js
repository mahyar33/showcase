// Handles saga functions related to global events.
import { takeLatest, put, take, cancel, select, takeEvery, putResolve } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import { CHECK_NETWORK_FAILURE, SET_NETWORK_STATUS } from './GlobalConstants'
import {
  checkNetworkFailureAction,
  clearNetworkFailureAction,
  setNetworkFailureAction,
  setNetworkStatusAction
} from './GlobalActions'
import { makeSelectNetworkFailure, makeSelectNetworkStatus } from './GlobalSelectors'
import { NETWORK_STATUS } from '../../configs/Applications'
import { REHYDRATE } from 'redux-persist'
import { find } from 'lodash'

// If network status backs to online,it calls all api which were lost due to dropping internet connection and clears related redux store.
export function * onNetworkStatus (params) {
  if (params.payload === NETWORK_STATUS.online) {
    let networkFailure = yield select(makeSelectNetworkFailure())
    if (networkFailure && networkFailure.length > 0) {
      for (const item of networkFailure) {
        yield put({ type: item.type, payload: item.payload })
      }
    }
    yield put(clearNetworkFailureAction())
  }
}
// Calls `onNetworkStatus` when network status changes.<br />
// If route changes,saga cancels operation and calls `clearNetworkFailureAction`.<br />
// `clearNetworkFailureAction` clears all api actions which were stored in redux due to connection lost because we don't need to call again those apis when route changes.
function * watchNetworkStatus () {
  while (true) {
    const watcher = yield takeLatest(SET_NETWORK_STATUS, onNetworkStatus)
    yield take(LOCATION_CHANGE)
    yield cancel(watcher)
    yield put(clearNetworkFailureAction())
  }
}

// If internet connection drops,puts app in offline mode, and calls 'checkNetworkFailureAction' to store the action related to lost api to call them later again.
export function * onNetworkError (e, params) {
  let networkStatus = yield select(makeSelectNetworkStatus())
  if (!e.status) {
    if (networkStatus === NETWORK_STATUS.online) { yield put(setNetworkStatusAction(NETWORK_STATUS.offline)) }
    if (params) { yield put(checkNetworkFailureAction(params)) }
  }
}
// If internet connection drops,puts app in offline mode, and calls 'checkNetworkFailureAction' to store the action related to initializing api which is used before connecting socket to call them later.
export function * onSocketError (e, params) {
  let networkStatus = yield select(makeSelectNetworkStatus())
  if (networkStatus === NETWORK_STATUS.online) { yield put(setNetworkStatusAction(NETWORK_STATUS.offline)) }
  if (params) {
    for (const item of params) {
      yield putResolve(checkNetworkFailureAction(item))
    }
  }
}
// When app runs, puts app in online mode.
export function * onReduxPersist () {
  yield put(setNetworkStatusAction(NETWORK_STATUS.online))
  yield put(clearNetworkFailureAction())
}
function * watchReduxPersist () {
  yield takeLatest(REHYDRATE, onReduxPersist)
}
// Adds lost api due to dropping internet connections to call them later.
// Checks if they are added before, it' doesn't add them again.
export function * onNetworkFailure (params) {
  let networkFailure = yield select(makeSelectNetworkFailure())
  if (!find(networkFailure, ['type', params.payload.type])) {
    yield put(setNetworkFailureAction(params.payload))
  }
}
function * watchNetworkFailure () {
  yield takeEvery(CHECK_NETWORK_FAILURE, onNetworkFailure)
}

export default [watchNetworkStatus(), watchReduxPersist(), watchNetworkFailure()]
