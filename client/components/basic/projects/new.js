/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import Auth from "../../common/auth.js"
import {validateNewProject} from "../../common/validation/functions.js";
import Errors from "../../common/errors.js"
import newProject from "../../common/connection.js"

export default class AddProject extends React.Component{
    constructor(props){
        super(props);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleError = this.handleError.bind(this);
        this.createProject = this.createProject.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

        this.state = {name:"",description:"",errors:[]}
    }

    handleNameChange(e){
        this.setState({name:e.target.value});
    }

    handleDescriptionChange(e){
        this.setState({description:e.target.value})
    }


    handleSuccess(data){
        console.log("Success");
        this.props.history.push("/")
    }

    handleError(xhr,status,err){
        console.log(xhr.responseJSON["message"]);
        let raised = [xhr.responseJSON["message"]];
        this.setState({errors:raised});
        setTimeout(function () {
                this.setState({errors:[]})
            }.bind(this)
            ,3000);
    }

    createProject(e){
        e.preventDefault();
        console.log(this.state.name,this.state.description);
        if(this.validateForm()){
            let requestBody = {name:this.state.name,description:this.state.description};
            newProject.newProject(Auth.getToken(),requestBody,this.handleSuccess,this.handleError);
        }
    }

    validateForm(){
        let validationErrors = validateNewProject(this.state.name,this.state.description);
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
                            <p>Aggiungi nuovo progetto</p>
                        </div>

                        <div className="panel-body">
                            <form>
                                <div className="form-group">
                                    <label>Nome Progetto</label>
                                    <input type="name" className="form-control" id="name" onChange={this.handleNameChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Descrizione</label>
                                    <input type="text" className="form-control" id="description" onChange={this.handleDescriptionChange}/>
                                <button type="submit" onClick={this.createProject} className="btn btn-default">Crea progetto</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}