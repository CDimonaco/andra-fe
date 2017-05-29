/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import Auth from "../../common/auth.js"
import getSensors from "../../common/connection.js"
import SensorRow from "./row.js"
import Errors from "../../common/errors.js"
import deleteSensor from "../../common/connection.js"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"

export default class SensorList extends React.Component {
    constructor(props) {
        super(props);

        this.getSensors = this.getSensors.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.otherSensors = this.otherSensors.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {sensors: [], errors: [],offset:0,hasmore:false};
    }

    componentDidMount() {
        this.getSensors();
    }

    handleDelete(id){
        console.log("Delete for id",id);
        deleteSensor.deleteSensor(Auth.getToken(),this.props.match.params.id,id,this.handleSuccess.bind(null,true),this.handleErrors)
    }

    getSensors() {
        getSensors.getSensors(Auth.getToken(),this.props.match.params.id,this.state.offset,this.handleSuccess, this.handleErrors);
    }

    otherSensors(){
        this.getSensors();
    }

    handleSuccess(data,del) {
        if(del){
            location.reload();
        }
        let updatedSensors = data.sensors.concat(this.state.sensors);
        this.setState({sensors:updatedSensors},console.log(data));
        if(data.hasMore){
            this.setState((prevState) => ({
                offset: prevState.offset + 100,hasmore:true
            }));
        }else{
            this.setState({hasmore:false});

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
                        {Auth.getUsername()} - Progetto {this.props.match.params.id} - Sensori
                    </h2>
                </div>
                <div className="col-lg-12 text-center">
                    <Link to={"/sensors/"+this.props.match.params.id+"/new"}>
                        <button style={{marginBottom:8}} className="btn btn-primary">Nuovo Sensore</button>
                    </Link>
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
                            return <SensorRow handleDelete={this.handleDelete} sensor={item} key={index} listindex={index + 1}/>
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

SensorList.propTypes = {
    match:PropTypes.shape({
        params:PropTypes.shape({
            id:PropTypes.string.isRequired,

        })
    })
};

