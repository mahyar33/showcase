// Uses to implements common behaviors in all sockets file like handling error.<br />
// `#socket` is a private variable injected by [DependencyInjection](../configs/DependencyInjection.html).<br />
// All socket are wrapper for [SocketConnection](../configs/network/SocketConnection.html) and also they organize and modify return values.<br />
// `backgroundEvents` returns those events that is used in saga as a background process (**events**) and we can define actions related to socket events in order to call them
// after socket disconnection or facing problems (**api**) .
import EVENT from './Event'
export default class BaseSocket {
  static #socket
  static set socket (socket) {
    this.#socket = socket
  }
  static get socket () {
    return this.#socket
  }
  static onErrorSocket = (callback) => {
    this.#socket.on(EVENT.default.error, callback)
  }
  static onConnectErrorSocket = (callback) => {
    this.#socket.on(EVENT.default.connect_error, callback)
  }
  static onConnectTimeoutSocket = (callback) => {
    this.#socket.on(EVENT.default.connect_timeout, callback)
  }
  static onDisconnectSocket = (callback) => {
    this.#socket.on(EVENT.default.disconnect, callback)
  }
  static backgroundEvents=() => {
    throw new Error('You have to implement the method backgroundEvents!')
  }
}
