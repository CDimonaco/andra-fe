/**
 * Created by cdimonaco on 24/05/2017.
 */
import {Switch,Route} from "react-router-dom"
import React from "react"
import AdminRoutes from "./admin/routes.js"
import Home from "./home.jsx"

export default class Main extends React.Component{
    render() {
        return(
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/admin" component={AdminRoutes}/>
            </Switch>
        );
    };
}