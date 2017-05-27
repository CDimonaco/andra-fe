/**
 * Created by cdimonaco on 24/05/2017.
 */
import React from "react"
import {Switch,Route} from "react-router-dom"
import Dashboard from "./dashboard.jsx"
import AddUser from "./adduser.js"

export default class AdminRoutes extends React.Component{
    render() {
        return(
            <Switch>
                <Route exact path="/admin" component={Dashboard}/>
                <Route exact path="/admin/create" component={AddUser}/>
            </Switch>
        );
    }
}