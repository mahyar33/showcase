/* global localStorage */
// Clarifying our security rules and also roles management

import { ROLE } from '../Base'

class Security {
  static #session;
  static #role;
  static get session () {
    return this.#session
  }
  static isUser = () => {
    if (!this.#role) return false
    return this.#role === ROLE.user
  }

  static isAdmin = () => {
    if (!this.#role) return false
    return this.#role === ROLE.admin
  }
  static injectingParam (session, role) {
    this.#session = session
    this.#role = role
  }
  static isAuthenticated () {
    return localStorage.getItem('Auth') === 'true'
  }

  static isAuthorized (roles) {
    if (!roles) return true
    return roles.indexOf(localStorage.getItem('role')) > -1
  }

  static signout () {

  }
}

export default Security
