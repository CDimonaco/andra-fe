/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import Auth from "../common/auth.js"
import getValues from "../common/connection.js"
import valuesRow from "../common/rows/valuesRow.js";
import Errors from "../common/errors.js"
import ValuesRow from "../common/rows/valuesRow";

export default class GetValues extends React.Component {
    constructor(props) {
        super(props);

        this.getValues = this.getValues.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.otherSensors = this.otherSensors.bind(this);
        this.projectid = "";
        this.sensorid = "";
        this.lastoffset = 0;
        this.state = {values: [],sensorid:"",projectid: "", errors: [],offset:0,hasmore:false};
    }

    componentWillMount() {
        if (!Auth.isUserAuthenticated() && Auth.getRole() !== "1") {
            this.props.history.push("/")
        }
        if (this.props.match.params.id) {
            this.setState({projectid: this.props.match.params.id});
            this.projectid = this.props.match.params.id;
        }
        if (this.props.match.params.sensorid) {
            this.setState({sensorid: this.props.match.params.sensorid});
            this.sensorid = this.props.match.params.sensorid;
        }
        this.getValues();
    }

    getValues() {
        getValues.getValues(Auth.getToken(),this.sensorid,this.state.offset,this.handleSuccess, this.handleErrors);
        this.lastoffset = this.state.offset;
    }
    otherSensors(){
        this.getSensors();
    }
    handleSuccess(data) {
        console.log("Values");
        console.log(data);
        this.setState({values:data.values});
        if(data.hasMore){
            this.setState({hasmore:true,offset:this.lastoffset+100})
        }
    }

    handleErrors(Jqxhr, statuscode, errors) {
        if (Jqxhr.status === 401 && Jqxhr.responseJSON["msg"]) {
            Auth.deauthenticateUser();
            this.props.history.push("/");
        }
        this.setState({errors: Jqxhr.responseJSON["message"]});
        setTimeout(function () {
                this.setState({errors: []})
            }.bind(this)
            , 3000);
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="page-header">
                        {this.state.projectid} - {this.state.sensorid} - Valori rilevati
                    </h2>
                </div>
                <div>
                    <Errors errors={this.state.errors}/>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Valore</th>
                            <th>Info</th>
                            <th>Timestamp</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.values.map(function (item, index) {
                            return <ValuesRow value={item} key={index} listindex={index + 1}/>
                        })}
                        </tbody>
                    </table>
                </div>
                {this.state.hasmore?
                    <div className="col-lg-12">
                        <button onClick={this.otherSensors} className="btn btn-success">Carica altri valori</button>
                    </div>
                    :false}
            </div>
        );
    }
}