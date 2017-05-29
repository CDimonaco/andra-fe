/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"


const SensorRow = (props) =>{
    if(!props.sensor){
        return <tr></tr>
    }

    return(
        <tr>
            <td>{props.listindex}</td>
            <td>{props.sensor.id}</td>
            <td>{props.sensor.name}</td>
            <td>{props.sensor.apikey}</td>
            <td>
                    <Link to={"/admin/project/"+props.project+"/"+props.sensor.id+"/values"}><button style={{marginLeft:6}} className="btn btn-success">Valori</button></Link>
            </td>
        </tr>
    );
};
SensorRow.propTypes = {
  sensor:PropTypes.object.isRequired
};
export default SensorRow;
