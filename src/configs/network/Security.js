/* global sessionStorage, localStorage */
// Clarifying our security rules and also roles management

class Security {
  static #session;
  static set session (session) {
    this.#session = session
  }
  static get session () {
    return this.#session
  }
  static isAuthenticated () {
    return sessionStorage.getItem('Auth') === 'true'
  }

  static isAuthorized (roles) {
    if (!roles) return true
    return roles.indexOf(localStorage.getItem('role')) > -1
  }

  static signout () {

  }
}

export default Security
