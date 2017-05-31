/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import Auth from "../common/auth.js"
import ProjectRow from "./rows/projectRow.js"
import Errors from "../common/errors.js"
import {getProjectAdmin} from "../common/connection.js"
import PropTypes from "prop-types"


export default class GetProjects extends React.Component{
    constructor(props){
        super(props);
        this.getProjects = this.getProjects.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.state = {projects:[],errors:[]};
    }

    componentDidMount(){
        this.getProjects();
    }

    getProjects(){
        getProjectAdmin(Auth.getToken(),this.props.match.params.id,this.handleSuccess,this.handleErrors);
    }

    handleSuccess(data){
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
                        {this.props.match.params.id} - Progetti
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

GetProjects.propTypes = {
    match:PropTypes.shape({
        params:PropTypes.shape({
            id:PropTypes.string.isRequired
        })
    })
};