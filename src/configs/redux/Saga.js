// Handling saga, channel and eventEmitter.
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

// `EventEmitter` used in all sagas to handle the saga that their result not to store in redux.
export const emitter = new EventEmitter()

// all sagas define there.
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
// starts saga.
const runSaga = (store) => {
  store.runSaga(rootSaga)
}

// Saga channel used in processing socket in background. uses [**eventChannel**](https://redux-saga.js.org/docs/api/#eventchannelsubscribe-buffer), [**buffers**](https://redux-saga.js.org/docs/api/#buffers) to start a channel and [BaseSocket](../../socket/BaseSocket.html) for socket error handling.<br />
// `createSocketChannel` gets arrays of as a input parameter (**socket**).<br />
// `addToChannel` sends to socket functions  as a callback.
// If data comes from socket,`addToChannel` will call and add data to `eventChannel`.<br />
// `errorHandler` sends to socket error handler functions as a callback.
// If an error occurs, `errorHandler` calls.
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
