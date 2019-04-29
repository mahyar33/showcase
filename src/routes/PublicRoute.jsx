// Prevents user can't enter public routes after authentication
// by using [`Security`](../utils/Security.html) class (for example login page).
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Security from '../utils/Security';


const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      Security.isAuthenticated() ? (
        <Redirect to={{
          pathname: '/dashboard',
          state: { from: props.location },// eslint-disable-line
        }}
        />

      ) : (<Component {...props} />)
    )}
  />
);
PublicRoute.propTypes = {
  component: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default PublicRoute;
