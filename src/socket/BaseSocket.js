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
}
