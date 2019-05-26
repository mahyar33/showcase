// Defines global routes.<br />
// [lazy](https://reactjs.org/docs/code-splitting.html) uses for code-splitting.<br />
// All scenes dependencies must be passed as props in this file.
import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import Private from '../configs/routing/Private'
import Redirection from '../configs/routing/Redirection'
import Security from '../configs/network/Security'
import Public from '../configs/routing/Public'

const Login = lazy(() => import('../app/scenes/login/Login'))
const Dashboard = lazy(() => import('../app/scenes/dashboard/Dashboard'))
const List = lazy(() => import('../app/scenes/list/List'))

const Routes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route key={0} exact path='/' component={Redirection} />
      <Public key={1} path='/login' component={Login} />
      <Private key={4} path='/dashboard' props={{ isUser: Security.isUser, isAdmin: Security.isAdmin }} component={Dashboard} />
      <Private key={5} path='/List' component={List} />
      <Route component={Redirection} />
    </Switch>
  </Suspense>

)
export default Routes
