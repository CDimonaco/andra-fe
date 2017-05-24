/**
 * Created by cdimonaco on 24/05/2017.
 */
import React from "react"
import Auth from "./common/auth.js"
import login from "./common/connection.js"

export default class Home extends React.Component{

    constructor(props){
        super(props);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.tryLogin = this.tryLogin.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.state = {username:"",password:"",result:false};
    }

    tryLogin(e){
         e.preventDefault();
         login.login(this.state.username, this.state.password,this.handleSuccess,function (xhr, status, err) {
             console.error(err)
         })
    }
    handleLogin(){
        console.log(this.state.result);
    }
    handlePassword(e){
        console.log("lol");
        this.setState({password:e.target.value});
    }
    handleUsername(e){
        this.setState({username:e.target.value});
    }
    handleSuccess(data){
        console.log(data);
        Auth.authenticateUser(data.accessToken,data.role);
        this.props.history.push('/admin')
    }

    render(){
        return(
                <div className="row">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label className="control-label col-sm-2">Email:</label>
                            <div className="col-sm-10">
                                <input type="text" onChange={this.handleUsername} className="form-control" id="email" placeholder="Enter email"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2">Password:</label>
                            <div className="col-sm-10">
                                <input onChange={this.handlePassword} type="password" className="form-control" id="pwd" placeholder="Enter password"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button className="btn btn-default" onClick={this.tryLogin}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
        );
    }
}
