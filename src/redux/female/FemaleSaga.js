// Handles saga functions related to city.
import { take, fork, call, put } from 'redux-saga/effects'
import FemaleSocket from '../../socket/FemaleSocket'
import { createSocketChannel } from '../../configs/redux/Saga'
import { setFemaleListAction } from './FemaleActions'
import { onSocketError } from '../global/GlobalSaga'

export function * onFemaleSocket () {
  const { events, api } = FemaleSocket.backgroundEvents()
  const socketChannel = yield call(createSocketChannel, events)
  while (true) {
    try {
      const payload = yield take(socketChannel)
      yield put(setFemaleListAction(payload))
      console.log('payload', payload)
    } catch (err) {
      console.error('socket error:', err.message)
      yield fork(onSocketError, err, api)
    }
  }
}

function * watchFemaleSocket () {
  yield fork(onFemaleSocket)
}

export default [watchFemaleSocket()]
