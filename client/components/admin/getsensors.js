/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import Auth from "../common/auth.js"
import getSensors from "../common/connection.js"
import SensorRow from "../common/rows/sensorsRow.js";
import Errors from "../common/errors.js"

export default class GetSensors extends React.Component {
    constructor(props) {
        super(props);

        this.getSensors = this.getSensors.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.otherSensors = this.otherSensors.bind(this);
        this.projectid = "";
        this.lastoffset = 0;
        this.state = {sensors: [], projectid: "", errors: [],offset:0,hasmore:false};
    }

    componentWillMount() {
        if (!Auth.isUserAuthenticated() && Auth.getRole() !== "1") {
            this.props.history.push("/")
        }
        if (this.props.match.params.id) {
            this.setState({projectid: this.props.match.params.id});
            this.projectid = this.props.match.params.id;
        }
        this.getSensors();
    }

    getSensors() {
        getSensors.getSensors(Auth.getToken(), this.projectid,this.state.offset,this.handleSuccess, this.handleErrors);
        this.lastoffset = this.state.offset;
    }
    otherSensors(){
        this.getSensors();
    }
    handleSuccess(data) {
        console.log("Sensors");
        console.log(data);
        this.setState({sensors:data.sensors});
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
                        {this.state.projectid} - Sensori
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
                            <th>Api key</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.sensors.map(function (item, index) {
                            return <SensorRow project ={this.state.projectid} sensor={item} key={index} listindex={index + 1}/>
                        }.bind(this))}
                        </tbody>
                    </table>
                </div>
                {this.state.hasmore?
                    <div className="col-lg-12">
                        <button onClick={this.otherSensors} className="btn btn-success">Carica altri sensori</button>
                    </div>
                    :false}
            </div>
        );
    }
}