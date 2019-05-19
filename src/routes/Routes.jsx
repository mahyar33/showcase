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
const List = lazy(() => import('../app/scenes/List/List'))

const Routes = () => (

  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route key={0} exact path='/' component={RedirectIndex} />
      <Route key={1} path='/login' component={routeProps => (<Login {...routeProps} />)} />
      <Route key={2} path='/test' component={routeProps => (<Test {...routeProps} />)} />
      <Route key={3} path='/temp' component={routeProps => (<Temp {...routeProps} />)} />
      <Private key={4} path='/dashboard' props={{ isUser: Security.isUser, isAdmin: Security.isAdmin }} component={Dashboard} />
      <Private key={5} path='/List' component={List} />
      <Route component={RedirectIndex} />
    </Switch>
  </Suspense>

)
export default Routes
