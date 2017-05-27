/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import {Link} from "react-router-dom"


export default class SensorRow extends React.Component{
    constructor(props){
        super(props);
        this.state = {sensors:{},listindex:"",project:""}
    }

    componentWillMount(){
        console.log("will mount");
        if(this.props.sensor){
            this.setState({sensors:this.props.sensor})
        }
        if(this.props.project){
            this.setState({project:this.props.project})
        }

        if(this.props.listindex){
            this.setState({listindex:this.props.listindex})
        }
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
                    <td>
                        <Link to={"/admin/project/"+this.state.project+"/"+this.state.sensors.id+"/values"}><button style={{marginLeft:6}} className="btn btn-success">Valori</button></Link>
                    </td>
                </td>
            </tr>
        );
    }
}