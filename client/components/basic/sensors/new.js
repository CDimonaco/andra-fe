/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import Auth from "../../common/auth.js"
import {validateNewSensor} from "../../common/validation/functions.js";
import Errors from "../../common/errors.js"
import newSensor from "../../common/connection.js"

export default class AddSensor extends React.Component{
    constructor(props){
        super(props);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleError = this.handleError.bind(this);
        this.createSensor = this.createSensor.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.projectid = "";
        this.state = {name:"",errors:[],projectid:""}
    }

    handleNameChange(e){
        this.setState({name:e.target.value});
    }

    componentWillMount(){
        if(this.props.match.params.id){
            this.setState({projectid:this.props.match.params.id});
            this.projectid = this.props.match.params.id;
        }
    }

    handleSuccess(data){
        console.log("Success");
        this.props.history.goBack();
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

    createSensor(e){
        e.preventDefault();
        console.log(this.state.name);
        if(this.validateForm()){
            let requestBody = {name:this.state.name};
            newSensor.newSensor(Auth.getToken(),this.projectid,requestBody,this.handleSuccess,this.handleError);
        }
    }

    validateForm(){
        let validationErrors = validateNewSensor(this.state.name);
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
                            <p>Progetto {this.state.projectid} - Nuovo sensore</p>
                        </div>

                        <div className="panel-body">
                            <form>
                                <div className="form-group">
                                    <label>Nome Sensore</label>
                                    <input type="name" className="form-control" id="name" onChange={this.handleNameChange}/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" onClick={this.createSensor} className="btn btn-default">Crea sensore</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}