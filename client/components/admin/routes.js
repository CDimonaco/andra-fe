/**
 * Created by cdimonaco on 24/05/2017.
 */
import React from "react"
import {Switch,Route} from "react-router-dom"
import Dashboard from "./dashboard.jsx"

export default class AdminRoutes extends React.Component{
    render() {
        return(
            <Switch>
                <Route exact path="/admin" component={Dashboard}/>
            </Switch>
        );
    }
}