/**
 * Created by cdimonaco on 24/05/2017.
 */
import React from "react"
import {Link} from "react-router-dom"
import Auth from "../auth.js"
import {Redirect} from "react-router-dom"
export default class Nav extends React.Component{
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {logout:false}
    }
    handleLogout(e){
        e.preventDefault();
        console.log("logout");
        Auth.deauthenticateUser();
        this.setState({logout:true});
    }
    render(){

        return(
            <div>
                {this.state.logout ?
                    <Redirect to="/" /> :false}
                {Auth.isUserAuthenticated()?
                    <nav className="navbar navbar-inverse navbar-fixed-top">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#andrabar">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="#">A.N.D.R.A</a>
                            </div>
                            <div className="collapse navbar-collapse" id="andrabar">
                                <ul className="nav navbar-nav">
                                <li className="active"><a href="#">Home</a></li>
                                <li onClick={this.handleLogout}><a href="#">Logout</a></li>

                                {Auth.getRole() === "1" ?
                                    <li className="dropdown">
                                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">Admin <span className="caret"></span></a>
                                        <ul className="dropdown-menu">
                                            <li><Link to="/admin">Dashboard</Link></li>
                                            <li><Link to="/admin/create">Create User</Link></li>
                                            <li>Projects</li>
                                        </ul>
                                    </li>
                                    :false}
                                </ul>
                            </div>
                        </div>
                    </nav>
                :false}
            </div>
        );
    }
}