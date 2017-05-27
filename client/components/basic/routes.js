/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import {Switch,Route,Redirect} from "react-router-dom"
import Auth from "../common/auth.js"
import Login from "../home.jsx"

export default class BasicRoutes extends React.Component{
    render() {
        return(
            <Switch>
                <Route exact path="/" render={props => (
                    !Auth.isUserAuthenticated() ? (
                        <Login {...props}/>
                    ) : (
                        <Redirect to={{
                            pathname: '/admin'
                        }}/>
                    )
                )} />
            </Switch>
        );
    }
}