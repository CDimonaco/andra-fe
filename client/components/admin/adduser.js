/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import Auth from "../common/auth.js"
import {validateNewUser} from "../common/validation/functions.js";
import Errors from "../common/errors.js"
import newUser from "../common/connection.js"

export default class AddUser extends React.Component{
    constructor(props){
        super(props);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleError = this.handleError.bind(this);
        this.createUser = this.createUser.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);

        this.state = {username:"",password:"",email:"",role:"",errors:[]}
    }

    handleUsernameChange(e){
        this.setState({username:e.target.value});
    }
    componentDidMount(){
        if(!Auth.isUserAuthenticated() && Auth.getRole() !== "1"){
            this.props.history.push("/")
        }
        console.log("Component loade");
    }
    handlePasswordChange(e){
        this.setState({password:e.target.value});
    }

    handleRoleChange(e){
        this.setState({role:parseInt(e.target.value)})
    }

    handleEmailChange(e){
        this.setState({email:e.target.value})
    }


    handleSuccess(data){
        console.log("Success");
        this.props.history.push("/admin")
    }

    handleError(xhr,status,err){
        let raised = [xhr.responseJSON["message"]];
        this.setState({errors:raised});
        setTimeout(function () {
                this.setState({errors:[]})
            }.bind(this)
            ,3000);
    }

    createUser(e){
        e.preventDefault();
        console.log(this.state.username,this.state.password,this.state.email,this.state.role);
        if(this.validateForm()){
            let requestBody = {username:this.state.username,password:this.state.password,email:this.state.email,role:parseInt(this.state.role)};
            newUser.newUser(Auth.getToken(),requestBody,this.handleSuccess,this.handleError);
        }
    }

    validateForm(){
        let validationErrors = validateNewUser(this.state.username,this.state.password,this.state.email,this.state.role);
        console.log(validationErrors);
        if(validationErrors.length > 0){
            this.setState({errors:validationErrors});
            setTimeout(function () {
                    this.setState({errors:[]})
                }.bind(this)
                ,3000);
            return false;
        }else{
            return true;
        }
    }

    render(){
        return(
            <div className="row">
                <div className="col-lg-12">
                    <Errors errors={this.state.errors}/>
                </div>
                <div className="col-lg-6 col-lg-offset-3">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <p>Aggiungi nuovo utente</p>
                        </div>

                        <div className="panel-body">
                            <form>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="username" className="form-control" id="username" onChange={this.handleUsernameChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" id="email" onChange={this.handleEmailChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" id="pwd" onChange={this.handlePasswordChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Ruolo</label>
                                    <select id="role" className="form-control" onChange={this.handleRoleChange}>
                                        <option value={"-1"}>Scegli il ruolo</option>
                                        <option value={"0"}>Utente basic</option>
                                        <option value={"1"}>Utente admin</option>
                                    </select>
                                </div>
                                <button type="submit" onClick={this.createUser} className="btn btn-default">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}