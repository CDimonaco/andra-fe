/**
 * Created by cdimonaco on 28/05/2017.
 */
import React from "react"
import Auth from "../../common/auth.js"
import getValues from "../../common/connection.js"
import ValuesRow from "./row.js";
import Errors from "../../common/errors.js"
import ValuesChart from "./chart.js"

export default class ValuesList extends React.Component {
    constructor(props) {
        super(props);

        this.getValues = this.getValues.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.otherValues = this.otherValues.bind(this);
        this.projectid = "";
        this.sensorid = "";
        this.lastoffset = 0;
        this.state = {values: [],sensorid:this.props.match.params.sensorid, errors: [],offset:0,hasmore:false};
        this.getValues();
    }

    componentWillMount() {
        if (this.props.match.params.sensorid) {
            this.setState({sensorid: this.props.match.params.sensorid});
            this.sensorid = this.props.match.params.sensorid;
        }
    }

    getValues() {
        getValues.getValues(Auth.getToken(),this.state.sensorid,this.state.offset,this.handleSuccess, this.handleErrors);
        this.lastoffset = this.state.offset;
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
            this.setState({hasmore:true,offset:this.lastoffset+100})
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
                        {this.state.sensorid} - Valori rilevati
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
