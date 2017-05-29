/**
 * Created by cdimonaco on 24/05/2017.
 */
import React from "react"
import Auth from "./common/auth.js"
import login from "./common/connection.js"
import Errors from "./common/errors.js"

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.tryLogin = this.tryLogin.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleError = this.handleError.bind(this);
        this.state = {username:"",password:"",result:false,errors:[]};
    }

    tryLogin(e){
         e.preventDefault();
         login.login(this.state.username, this.state.password,this.handleSuccess,this.handleError)
    }
    handleError(xhr,status,err){
        let raised = [xhr.responseJSON["message"]];
        this.setState({errors:raised});
        setTimeout(function () {
                this.setState({errors:[]})
            }.bind(this)
            ,3000)
    }
    handlePassword(e){
        this.setState({password:e.target.value});
    }
    handleUsername(e){
        this.setState({username:e.target.value});
    }
    handleSuccess(data){
        Auth.authenticateUser(data.accessToken,data.role,this.state.username);
        this.props.history.push('/')
    }

    render(){
        return(
                <div className="row">
                    <div className="row" style={{marginBottom:25}}>
                        <div className="col-lg-6">
                            <img width={200} height={400} className="img-responsive center-block" src={"../client/components/common/LOGO.PNG"}/>
                        </div>
                        <div className="col-lg-6">
                            <h2>A.N.D.R.A</h2>
                            <br/>
                            <h4>Di Monaco Carmine - 0124001236</h4>
                            <h4>Università degli studi di Napoli "Parthenope"</h4>
                            <h4>A.A. 2016/2017</h4>
                            <h4>Esame di Tecnologie web</h4>
                        </div>
                    </div>
                    <hr/>
                    <div className="col-lg-12 offset-6">
                        <Errors errors={this.state.errors}/>
                    </div>
                    <div className="col-lg-6 col-lg-offset-3">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Effettua il login
                            </div>
                            <div className="panel-body">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label className="control-label col-sm-2">Username:</label>
                                        <div className="col-sm-10">
                                            <input type="text" onChange={this.handleUsername} className="form-control" id="username" placeholder="Enter username"/>
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
                                            <button className="btn btn-default" onClick={this.tryLogin}>Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
