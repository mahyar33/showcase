/* global localStorage */
// Clarifying our security rules and also roles management

import { ROLE } from '../Base'

class Security {
  static #session;
  static #role;
  static #logout;
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
  static injectingParam (session, role, logout) {
    this.#session = session
    this.#role = role
    this.#logout = logout
  }
  static isAuthenticated () {
    return localStorage.getItem('Auth') === 'true'
  }

  static isAuthorized (roles) {
    if (!roles) return true
    return roles.indexOf(localStorage.getItem('role')) > -1
  }

  static logout () {
    localStorage.setItem('Auth', 'false')
    this.#logout()
  }
}

export default Security
