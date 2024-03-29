/**
 * Created by cdimonaco on 24/05/2017.
 */

import React from "react"
import {Link} from "react-router-dom"
import Auth from "../auth.js"

const Nav = (props) =>{
  const handleLogout = (e) => {
      console.log("Logged out");
      e.preventDefault();
      Auth.deauthenticateUser();
      location.reload();
  };

  return(
      <div>
          {Auth.isUserAuthenticated()?
              <nav className="navbar navbar-inverse navbar-fixed-top">
                  <div className="container-fluid">
                      <div className="navbar-header">
                          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#tecweb-febar">
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                          </button>
                          <a className="navbar-brand">tecweb-fe.</a>
                      </div>
                      <div className="collapse navbar-collapse" id="tecweb-febar">
                          <ul className="nav navbar-nav">
                              <li id="nav-home"><Link to="/">Home</Link></li>
                              <li id="nav-project"><Link to="/projects/new">Nuovo progetto</Link></li>
                              <li><Link onClick={handleLogout} to={"/"}>Logout</Link></li>

                              {Auth.getRole() === "1" ?
                                  <li className="dropdown">
                                      <a className="dropdown-toggle" data-toggle="dropdown" href="#">Admin <span className="caret"></span></a>
                                      <ul className="dropdown-menu">
                                          <li><Link to="/admin">Dashboard</Link></li>
                                          <li><Link to="/admin/create">Create User</Link></li>
                                      </ul>
                                  </li>
                                  :false}
                          </ul>
                      </div>
                  </div>
              </nav>
              :false}
      </div>
  )
};

export default Nav;