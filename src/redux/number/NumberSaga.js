import { take, takeLatest, cancel, call, fork } from 'redux-saga/effects'
import { NUMBER_LIST } from './NumberConstants'

import { LOCATION_CHANGE } from 'connected-react-router'
import NumberServices from '../../services/NumberServices'
import { emitter } from '../../configs/redux/SagaChannel'
import { onNetworkError } from '../global/GlobalSaga'

export function * onNumberList (params) {
  console.log('onNumberList', params)
  try {
    emitter.emit(NUMBER_LIST, { loading: true, success: false, error: false })
    const payload = yield call(NumberServices.list)
    emitter.emit(NUMBER_LIST, { loading: false, success: payload.data, error: false })
  } catch (err) {
    emitter.emit(NUMBER_LIST, { loading: false, success: false, error: err })
    yield fork(onNetworkError, err, params)
  }
}

function * watchNumberList () {
  while (true) {
    const watcher = yield takeLatest(NUMBER_LIST, onNumberList)
    yield take(LOCATION_CHANGE)
    yield cancel(watcher)
  }
}

export default [watchNumberList()]
