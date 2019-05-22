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

function * watchNetworkStatus () {
  while (true) {
    const watcher = yield takeLatest(SET_NETWORK_STATUS, onNetworkStatus)
    yield take(LOCATION_CHANGE)
    yield cancel(watcher)
    yield put(clearNetworkFailureAction())
  }
}
export function * onNetworkError (e, params) {
  let networkStatus = yield select(makeSelectNetworkStatus())
  if (!e.status) {
    if (networkStatus === NETWORK_STATUS.online) { yield put(setNetworkStatusAction(NETWORK_STATUS.offline)) }
    if (params) { yield put(checkNetworkFailureAction(params)) }
  }
}
export function * onSocketError (e, params) {
  let networkStatus = yield select(makeSelectNetworkStatus())
  if (networkStatus === NETWORK_STATUS.online) { yield put(setNetworkStatusAction(NETWORK_STATUS.offline)) }
  if (params) {
    for (const item of params) {
      yield putResolve(checkNetworkFailureAction(item))
    }
  }
}
export function * onReduxPersist () {
  yield put(setNetworkStatusAction(NETWORK_STATUS.online))
  yield put(clearNetworkFailureAction())
}
function * watchReduxPersist () {
  yield takeLatest(REHYDRATE, onReduxPersist)
}
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
