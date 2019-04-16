import React from "react";
import {Switch,Route} from "react-router-dom";
import PublicRoute from "../config/Routing/PublicRoute";
import PrivateRoute from "../config/Routing/PrivateRoute";
import RedirectIndex from "../config/Routing/RedirectIndex";
import Template from "./Template/Template";
import Test from "./Test/Test";


export const Routes = () => (
    <Switch>
{/*        <Route key={0} exact path="/" component={RedirectIndex}/>,*/}
        <Route key={1} exact path="/temp" component={Template}/>,
        <Route key={2} exact path="/test" component={Test}/>,
   {/*     <Route component={RedirectIndex}/>*/}
    </Switch>
)
