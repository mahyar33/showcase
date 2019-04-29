// Prevents user can't enter private routes before authentication
// by using [`Security`](../utils/Security.html) class.

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Security from '../utils/Security';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      !Security.isAuthenticated() ? (// eslint-disable-line
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location },// eslint-disable-line
        }}
        />

      ) : rest.roles && !Security.isAuthorized(rest.roles) ? (
        <Redirect to={{
          pathname: '/dashboard',
          state: { from: props.location },// eslint-disable-line
        }}
        />
      ) : (<Component {...props} />)
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default PrivateRoute;
