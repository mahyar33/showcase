import { all } from 'redux-saga/effects'
import BaseSocket from '../../socket/BaseSocket'
import { eventChannel, buffers } from 'redux-saga'
import EventEmitter from 'events'
import UserSaga from '../../redux/user/UserSaga'
import CitySaga from '../../redux/city/CitySaga'
import FemaleSaga from '../../redux/female/FemaleSaga'
import MaleSaga from '../../redux/male/MaleSaga'
import NumberSaga from '../../redux/number/NumberSaga'
import GlobalSaga from '../../redux/global/GlobalSaga'

export const emitter = new EventEmitter()
function * rootSaga () {
  yield all([
    ...GlobalSaga,
    ...UserSaga,
    ...CitySaga,
    ...FemaleSaga,
    ...MaleSaga,
    ...NumberSaga

  ])
}
const runSaga = (store) => {
  store.runSaga(rootSaga)
}

export function createSocketChannel (socket) {
  return eventChannel(emit => {
    const addToChannel = (event) => {
      emit(event)
    }
    const errorHandler = (errorEvent) => {
      emit(errorEvent)
    }
    socket.map((item) => {
      item(addToChannel)
    })
    BaseSocket.onErrorSocket(errorHandler)
    BaseSocket.onConnectErrorSocket(errorHandler)
    return () => {

    }
  }, buffers.expanding())
}

export default runSaga
