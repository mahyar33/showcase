import { take, fork, call, putResolve, put } from 'redux-saga/effects'
import FemaleSocket from '../../socket/FemaleSocket'
import { createSocketChannel } from '../../configs/redux/SagaChannel'
import { setFemaleListAction } from './FemaleActions'
import { checkNetworkFailureAction } from '../global/GlobalActions';

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
      for (const item of api) {
        yield putResolve(checkNetworkFailureAction(item))
      }
    }
  }
}

function * watchFemaleSocket () {
  yield fork(onFemaleSocket)
}

export default [watchFemaleSocket()]
