import React from "react";
import {Switch,Route} from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import RedirectIndex from "./RedirectIndex";
import Template from "../scenes/Template/Template";
import Test from "../scenes/Test/Test";


export const Routes = () => (
    <Switch>
{/*        <Route key={0} exact path="/" component={RedirectIndex}/>,*/}
        <Route key={1} exact path="/temp" component={Template}/>,
        <Route key={2} exact path="/test" component={Test}/>,
   {/*     <Route component={RedirectIndex}/>*/}
    </Switch>
)
