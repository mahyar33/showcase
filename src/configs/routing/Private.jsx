// Prevents user can't enter private routes before authentication
// by using [`Security`](../utils/Security.html) class.

import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Security from '../network/Security'

const Private = ({ component: Component, props, ...rest }) => (
  <Route
    {...rest}
    render={routeProps => (
      !Security.isAuthenticated() ? (// eslint-disable-line
        <Redirect to={{
          pathname: '/login',
          state: { from: routeProps.location },// eslint-disable-line
        }}
        />

      ) : rest.roles && !Security.isAuthorized(rest.roles) ? (
        <Redirect to={{
          pathname: '/dashboard',
          state: { from: routeProps.location },// eslint-disable-line
        }}
        />
      ) : (<Component {...routeProps} {...props} />)
    )}
  />
)

Private.propTypes = {
  component: PropTypes.object.isRequired,
  props: PropTypes.object
}
export default Private
