/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import {Switch,Route,Redirect} from "react-router-dom"
import ProjectList from "./projects/list.js"
import AddProject from "./projects/new.js"
import SensorList from "./sensors/list.js"

export default class BasicRoutes extends React.Component{
    render() {
        return(
            <Switch>
                <Route exact path="/" component={ProjectList}/>
                <Route path="/projects/:id/sensors" component={SensorList}/>
                <Route path="/projects/new" component={AddProject}/>
            </Switch>
        );
    }
}