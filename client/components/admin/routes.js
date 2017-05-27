/**
 * Created by cdimonaco on 24/05/2017.
 */
import React from "react"
import {Switch,Route} from "react-router-dom"
import Dashboard from "./dashboard.jsx"
import AddUser from "./adduser.js"
import GetProjects from "./getprojects.js"
import GetSensors from "./getsensors.js"
import GetValues from "./getValues.js"

export default class AdminRoutes extends React.Component{
    render() {
        return(
            <Switch>
                <Route exact path="/admin" component={Dashboard}/>
                <Route exact path="/admin/create" component={AddUser}/>
                <Route exact path="/admin/project/:id" component={GetProjects}/>
                <Route exact path="/admin/project/:id/sensors" component={GetSensors}/>
                <Route exact path="/admin/project/:id/:sensorid/values" component={GetValues}/>
            </Switch>
        );
    }
}