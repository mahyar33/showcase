// clarifying our security rules and also roles managent
import { Component } from 'react';


class Security extends Component {
  static isAuthenticated() {
    return sessionStorage.getItem('Auth') === 'true';
  }

  static isAuthorized(roles) {
    if (!roles) return true;
    return roles.indexOf(localStorage.getItem('role')) > -1;
  }

  static signout() {

  }
}

export default Security;
