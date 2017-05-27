/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import Auth from "../../common/auth.js"
import ProjectRow from "./row.js"
import Errors from "../../common/errors.js"
import getProjects from "../../common/connection.js"
import deleteProjects from "../../common/connection.js"

export default class SensorsList extends React.Component{
    constructor(props){
        super(props);

        this.getSensors = this.getSensors.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.handleSensorDelete = this.handleSensorDelete.bind(this);
        this.state = {sensors:[],errors:[]};
    }

    componentWillMount(){
        this.getProjects();
    }

    getSensors(){
        getProjects.getProjects(Auth.getToken(),this.handleSuccess,this.handleErrors);
    }

    handleSuccess(data,del){
        if(del){
            location.reload();
        }
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

    handleSensorDelete(id){
        console.log("Delete project",id);
        deleteProjects.deleteProject(Auth.getToken(),id,this.handleSuccess.bind(null,true),this.handleErrors);
    }

    render(){
        return(
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="page-header">
                        {Auth.getUsername()} - I tuoi progetti
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
                            return <ProjectRow handleDelete={this.handleProjectDelete} project={item} key={index} listindex={index+1}/>
                        }.bind(this))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

