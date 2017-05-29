/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import {Link} from "react-router-dom"



const SensorRow = (props) => {
  const deleteSensor = (e) => {
    props.handleDelete(props.sensor.id) ;
  };

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
              <button className="btn btn-danger" onClick={deleteSensor}>Elimina</button>
              <Link to={"/sensors/"+props.sensor.id+"/values"}><button style={{marginLeft:6}} className="btn btn-success">Valori</button></Link>
          </td>
      </tr>
  )
};

export default SensorRow;
