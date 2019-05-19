import BaseSocket from '../../socket/BaseSocket'
import { eventChannel, buffers, stdChannel } from 'redux-saga'
import EventEmitter from 'events'
export const emitter = new EventEmitter()
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
export const createIO = () => {
  const channel = stdChannel()
  return {
    channel,
    dispatch: action => {
      setImmediate(() => {
        channel.put(action)
      })
    }
  }
}

/*
export const nonReduxSaga = (rootSaga, initState) => {
  const [state, setState] = useState(initState)
  const IO = useRef(createIO())
  useEffect(() => {
    const task = runSaga(IO.current, rootSaga, setState)
    return () => task.cancel()
  }, [])
  return [state, IO.current.dispatch]
}
*/
