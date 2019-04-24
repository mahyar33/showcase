import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Template from '../scenes/Template/Template';
import Test from '../scenes/Test/Test';


const Routes = () => (
  <Switch>
    {/*        <Route key={0} exact path="/" component={RedirectIndex}/>, */}
    <Route key={1} exact path="/temp" component={Template} />
,
    <Route key={2} exact path="/test" component={Test} />
,
    {/*     <Route component={RedirectIndex}/> */}
  </Switch>
);
export default Routes;
