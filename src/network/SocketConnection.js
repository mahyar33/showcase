import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_SOCKET ? process.env.REACT_APP_SOCKET : 'http://localhost:9093');

socket.on('connect', function () {
    // console.log('socket connect')
});

export default socket;
