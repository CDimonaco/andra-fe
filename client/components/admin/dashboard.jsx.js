/**
 * Created by cdimonaco on 24/05/2017.
 */
import React from "react"
import Auth from "../common/auth.js"
import UserRow from "./rows/userRow.js"
import {getUsers} from "../common/connection.js"
import {deleteUsers} from "../common/connection.js"
import Errors from "../common/errors.js";

export default class DashBoard extends React.Component{
    constructor(props){
        super(props);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.otherUsers = this.otherUsers.bind(this);
        this.lastoffset = 0;
        this.state = {users:[],errors:[],offset:0,hasmore:false,username:Auth.getUsername()};
    }

    componentDidMount(){
        this.getUsers();
    }

    getUsers(){
        getUsers(Auth.getToken(),this.state.offset,this.handleSuccess,this.handleErrors);
        this.lastoffset = this.state.offset;
    }

    handleSuccess(data,del){
        if(del){
            location.reload();
        }
        console.log(data);
        this.setState({users:data.users});
        if(data.hasMore){
            this.setState({hasmore:true,offset:this.lastoffset+100})
        }
    }

    otherUsers(){
        this.getUsers();
    }

    handleErrors(xhr,status,err){
        if(xhr.status === 401 && xhr.responseJSON["msg"]){
            Auth.deauthenticateUser();
            this.props.history.push("/");
        }
        if(xhr.status === 404 && xhr.responseJSON["message"]){
            let raised = [xhr.responseJSON["message"]];
            this.setState({errors:raised});
            setTimeout(function () {
                    this.setState({errors:[]})
                }.bind(this)
                ,3000);
            console.log("User not found");
        }
        console.log(xhr);
    }
    handleDelete(userid){
        deleteUsers(Auth.getToken(),userid,this.handleSuccess.bind(null,true),this.handleErrors);
        console.log("Delete outside the row");
    }
    render(){
        return(
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="page-header">
                        {this.state.username} - Dashboard
                    </h2>
                </div>
                <div>
                    <Errors errors={this.state.errors}/>
                    <table className="table table-bordered table-responsive">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Ruolo</th>
                            <th>E-mail</th>
                            <th>Azioni</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.users.map(function (item,index) {
                            return <UserRow currentUsername={this.state.username} handleDelete={this.handleDelete} users={item} key={index} listindex={index+1}/>
                        }.bind(this))}
                        </tbody>
                    </table>
                </div>
                {this.state.hasmore?
                    <div className="col-lg-12">
                        <button onClick={this.otherUsers} className="btn btn-success">Carica altri utenti</button>
                    </div>
                :false}
            </div>
        );
    }
}
