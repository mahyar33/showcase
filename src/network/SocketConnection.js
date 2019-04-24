// `SocketConnection` is using [socket.io-client](https://github.com/socketio/socket.io-client) to establish socket connection.


import io from 'socket.io-client';
// `process.env.REACT_APP_SOCKET` defines socket connection address
const socket = io(process.env.REACT_APP_SOCKET ? process.env.REACT_APP_SOCKET : 'http://localhost:9093');

socket.on('connect', () => {
  // console.log('socket connect')
});

export default socket;
