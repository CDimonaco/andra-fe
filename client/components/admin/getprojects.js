/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import Auth from "../common/auth.js"
import ProjectRow from "./projectRow.js"
import Errors from "../common/errors.js"
import getProjectAdmin from "../common/connection.js"


export default class GetProjects extends React.Component{
    constructor(props){
        super(props);

        this.getProjects = this.getProjects.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.userid = "";
        this.state = {projects:[],userid:"",errors:[]};
    }

    componentWillMount(){
        if(!Auth.isUserAuthenticated() && Auth.getRole() !== "1"){
            this.props.history.push("/")
        }
        if(this.props.match.params.id){
            this.setState({userid:this.props.match.params.id});
            this.userid = this.props.match.params.id;
        }
        this.getProjects();
    }

    getProjects(){
        getProjectAdmin.getProjectAdmin(Auth.getToken(),this.userid,this.handleSuccess,this.handleErrors);
    }

    handleSuccess(data){
        console.log("Projects");
        this.setState({projects:data["projects"]});
    }

    handleErrors(Jqxhr,statuscode,errors){
        if(Jqxhr.status === 401 && Jqxhr.responseJSON["msg"]){
            Auth.deauthenticateUser();
            this.props.history.push("/");
        }
        this.setState({errors:Jqxhr.responseJSON["message"]});
        setTimeout(function () {
                this.setState({errors:[]})
            }.bind(this)
            ,3000);
    }

    render(){
        return(
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="page-header">
                        {this.state.userid} - Progetti
                    </h2>
                </div>
                <div>
                    <Errors errors={this.state.errors}/>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrizione</th>
                            <th>Created At</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.projects.map(function (item,index) {
                            return <ProjectRow project={item} key={index} listindex={index+1}/>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}