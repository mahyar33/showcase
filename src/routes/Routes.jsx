// Defining global routes here.
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Test from '../app/scenes/Test/Test'
import Login from '../app/scenes/Login/Login'

const Routes = () => (
  <Switch>
    {/*        <Route key={0} exact path="/" component={RedirectIndex}/>, */}
    <Route key={1} exact path='/login' component={Login} />
,
    <Route key={2} exact path='/test' component={Test} />
,
    {/*     <Route component={RedirectIndex}/> */}
  </Switch>
)
export default Routes
