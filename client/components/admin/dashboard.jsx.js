/**
 * Created by cdimonaco on 24/05/2017.
 */
import React from "react"
import Auth from "../common/auth.js"
import UserRow from "./userRow.js"
import GetUsers from "../common/connection.js"

const mockUsers = [
    {
        "id" : "test",
        "username" : "test2",
        "role" : "test3",
        "email" : "test4"
    },
    {
        "id" : "test",
        "username" : "test2",
        "role" : "test3",
        "email" : "test4"
    },
    {
        "id" : "test",
        "username" : "test2",
        "role" : "test3",
        "email" : "test4"
    },
    {
        "id" : "test",
        "username" : "test2",
        "role" : "test3",
        "email" : "test4"
    }
];
export default class DashBoard extends React.Component{
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.lastoffset = 0;
        this.state = {users:mockUsers,errors:[],offset:0,hasmore:false}
        this.otherUsers = this.otherUsers.bind(this);
    }
    componentDidMount(){
        if(!Auth.isUserAuthenticated() && Auth.getRole() !== "1"){
            this.props.history.push("/")
        }
        this.getUsers();
    }

    getUsers(){
        GetUsers.getUsers(Auth.getToken(),this.state.offset,this.handleSuccess,this.handleErrors);
        this.lastoffset = this.state.offset;
    }
    handleSuccess(data){
        console.log(data)
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
        console.log(xhr.responseJSON["msg"]);
    }
    handleDelete(){
        console.log("Delete outside the row");
    }
    render(){
        let self = this;
        return(
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="page-header">
                        Dashboard
                    </h2>
                </div>
                <div>
                    <table className="table table-bordered">
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
                            return <UserRow handleDelete={self.handleDelete} users={item} key={index} listindex={index+1}/>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
