/**
 * Created by cdimonaco on 24/05/2017.
 */
import {Switch,Route,Redirect} from "react-router-dom"
import React from "react"
import AdminRoutes from "./admin/routes.js"
import BasicRoutes from "./basic/routes.js"
import Auth from "./common/auth.js"
import Login from "./home.jsx"

const Main = () =>{
    return(
        <Switch>
            <Route path="/admin"  render={props => (
                Auth.getRole() === "1" && Auth.isUserAuthenticated() ? (
                    <AdminRoutes {...props}/>
                ) : (
                    <Redirect to={{
                        pathname: '/'
                    }}/>
                )
            )} />
            <Route path="/" render={props => (
                !Auth.isUserAuthenticated() ? (
                    <Login {...props}/>
                ) : (
                    <BasicRoutes {...props}/>
                )
            )} />
        </Switch>
    )
};

export default Main;