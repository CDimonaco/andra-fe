/**
 * Created by cdimonaco on 28/05/2017.
 */
import React from "react"
import Auth from "../../common/auth.js"
import {getValues} from "../../common/connection.js"
import ValuesRow from "./row.js";
import Errors from "../../common/errors.js"
import ValuesChart from "./chart.js"
import PropTypes from "prop-types"

export default class ValuesList extends React.Component {
    constructor(props) {
        super(props);

        this.getValues = this.getValues.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.otherValues = this.otherValues.bind(this);
        this.state = {values: [],sensorid:this.props.match.params.sensorid, errors: [],offset:0,hasmore:false};
    }

    componentDidMount() {
        this.getValues();
    }

    getValues() {
        getValues(Auth.getToken(),this.props.match.params.sensorid,this.state.offset,this.handleSuccess, this.handleErrors);
    }

    otherValues(){
        this.getValues();
    }
    handleSuccess(data) {
        console.log("Values");
        console.log(data);
        let updatedData = data.values.concat(this.state.values);
        this.setState({values:updatedData});
        if(data.hasMore){
            this.setState((prevState) => ({
                offset: prevState.offset + 100,hasmore:true
            }));
        }else{
            this.setState({hasmore:false})
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
                        {this.props.match.params.sensorid} - Valori rilevati
                    </h2>
                </div>
                <div>
                    <Errors errors={this.state.errors}/>
                    {this.state.values.length > 0 ?
                        <ValuesChart raw={this.state.values} />
                    :false}
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
                        {this.state.values.map(function (item,index) {
                            return <ValuesRow value={item} key={index} listindex={index + 1}/>
                        })}
                        </tbody>
                    </table>
                </div>
                {this.state.hasmore?
                    <div className="col-lg-12">
                        <button onClick={this.otherValues} className="btn btn-success">Carica altri valori</button>
                    </div>
                    :false}
            </div>
        );
    }
}

ValuesList.propTypes = {
    match:PropTypes.shape({
        params:PropTypes.shape({
            sensorid:PropTypes.string.isRequired
        })
    })
};