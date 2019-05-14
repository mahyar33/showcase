// Defining global routes here.
import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import Private from '../configs/routing/Private'
import RedirectIndex from '../configs/routing/RedirectIndex'
import Security from '../configs/network/Security'

const Test = lazy(() => import('../app/scenes/Test/Test'))
const Login = lazy(() => import('../app/scenes/Login/Login'))
const Temp = lazy(() => import('../app/scenes/Template/Template'))
const Dashboard = lazy(() => import('../app/scenes/Dashboard/Dashboard'))

const Routes = () => (

  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route key={0} exact path='/' component={RedirectIndex} />
      <Route key={1} path='/login' component={Login} />
      <Route key={2} path='/test' component={Test} />
      <Route key={3} path='/temp' component={Temp} />
      <Private key={4} path='/dashboard' props={{ isUser: Security.isUser, isAdmin: Security.isAdmin }} component={Dashboard} />
      <Route component={RedirectIndex} />
    </Switch>
  </Suspense>

)
export default Routes
