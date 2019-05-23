// `SocketConnection` is using [socket.io-client](https://github.com/socketio/socket.io-client) to establish socket connection.
import io from 'socket.io-client'
import { SOCKET_ADDRESS } from '../Applications'

// `process.env.REACT_APP_SOCKET` defines socket connection address.
const socket = io(SOCKET_ADDRESS)

export default socket
