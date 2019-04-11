import React from "react";
import {Switch,Route} from "react-router-dom";
import PublicRoute from "../config/Routing/PublicRoute";
import PrivateRoute from "../config/Routing/PrivateRoute";
import RedirectIndex from "../config/Routing/RedirectIndex";


export const Routes = () => (
    <Switch>
        <Route key={0} exact path="/" component={RedirectIndex}/>,
        <Route component={RedirectIndex}/>
    </Switch>
)
