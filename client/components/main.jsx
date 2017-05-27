/**
 * Created by cdimonaco on 24/05/2017.
 */
import {Switch,Route,Redirect} from "react-router-dom"
import React from "react"
import AdminRoutes from "./admin/routes.js"
import BasicRoutes from "./basic/routes.js"
import Auth from "./common/auth.js"
import Login from "./home.jsx"

export default class Main extends React.Component{
    render() {
        return(
            <Switch>
                <Route exact path="/" render={props => (
                    !Auth.isUserAuthenticated() ? (
                        <Login {...props}/>
                    ) : (
                        <BasicRoutes {...props}/>
                    )
                )} />
                <Route path="/admin"  render={props => (
                    Auth.getRole() === "1" && Auth.isUserAuthenticated() ? (
                        <AdminRoutes {...props}/>
                    ) : (
                        <Redirect to={{
                            pathname: '/'
                        }}/>
                    )
                )} />
            </Switch>
        );
    };
}