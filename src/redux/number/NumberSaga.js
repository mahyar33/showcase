// Handles saga functions related to number.
import { take, takeLatest, cancel, call, fork } from 'redux-saga/effects'
import { NUMBER_LIST } from './NumberConstants'

import { LOCATION_CHANGE } from 'connected-react-router'
import NumberServices from '../../services/NumberServices'
import { emitter } from '../../configs/redux/Saga'
import { onNetworkError } from '../global/GlobalSaga'

// Calls [`NumberServices.list`](../../services/NumberServices.html) and gets data from server but it doesn't save result in redux store.<br />
// It backs data to the component by **event emitter**.
// Related component listens to `NUMBER_LIST`.
export function * onNumberList (params) {
  console.log('onNumberList', params)
  try {
    yield call([emitter, 'emit'], NUMBER_LIST, { loading: true, success: false, error: false })
    const payload = yield call(NumberServices.list)
    yield call([emitter, 'emit'], NUMBER_LIST, { loading: false, success: payload.data, error: false })
  } catch (err) {
    yield call([emitter, 'emit'], NUMBER_LIST, { loading: false, success: false, error: err })
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
