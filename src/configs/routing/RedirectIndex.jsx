// Specifying the redirect route after authentication.
import React from 'react'
import { Redirect } from 'react-router-dom'

const RedirectIndex = () => (
  <Redirect to='/dashboard' />
)

export default RedirectIndex