/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import {Link} from "react-router-dom"


export default class SensorRow extends React.Component{
    constructor(props){
        super(props);
        this.deleteSensor = this.deleteSensor.bind(this);
        this.state = {sensors:{},listindex:""}
    }

    componentWillMount(){
        if(this.props.sensor){
            this.setState({sensors:this.props.sensor})
        }
        if(this.props.listindex){
            this.setState({listindex:this.props.listindex})
        }
    }
    deleteSensor(){
        console.log("Delete sensor inside the row");
        this.props.handleDelete(this.state.sensors.id)
    }
    render(){
        if(!this.state.sensors){
            return(<tr></tr>);
        }

        return(

            <tr>
                <td>{this.state.listindex}</td>
                <td>{this.state.sensors.id}</td>
                <td>{this.state.sensors.name}</td>
                <td>{this.state.sensors.apikey}</td>
                <td>
                        <button className="btn btn-danger" onClick={this.deleteSensor}>Elimina</button>
                        <Link to={"/admin/project/"+this.state.project+"/"+this.state.sensors.id+"/values"}><button style={{marginLeft:6}} className="btn btn-success">Valori</button></Link>
                </td>
            </tr>
        );
    }
}