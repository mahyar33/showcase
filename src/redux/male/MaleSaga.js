// Handles saga functions related to male.
import { take, takeLatest, cancel, call, put, fork } from 'redux-saga/effects'
import { MALE_LIST } from './MaleConstants'

import { LOCATION_CHANGE } from 'connected-react-router'
import MaleServices from '../../services/MaleServices'
import { maleListErrorAction, maleListSuccessfulAction } from './MaleActions'
import { onNetworkError } from '../global/GlobalSaga'

export function * onMaleList (params) {
  console.log('onMaleList', params)
  try {
    const payload = yield call(MaleServices.list)
    yield put(maleListSuccessfulAction(payload.data))
  } catch (err) {
    yield put(maleListErrorAction(err))
    yield fork(onNetworkError, err, params)
  }
}

function * watchMaleList () {
  while (true) {
    const watcher = yield takeLatest(MALE_LIST, onMaleList)
    yield take(LOCATION_CHANGE)
    yield cancel(watcher)
  }
}

export default [watchMaleList()]
