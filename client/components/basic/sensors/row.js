/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import {Link} from "react-router-dom"
import ConfirmationModal from "../../common/confirmationModal.js"
import PropTypes from "prop-types"

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
              <a data-toggle="modal" data-target={"#"+props.sensor.id}>
                  <button type="button" className="btn btn-danger">
                      Elimina sensore
                  </button>
              </a>
              <Link to={"/sensors/"+props.sensor.id+"/values"}><button style={{marginLeft:6}} className="btn btn-success">Valori</button></Link>
          </td>
          <ConfirmationModal title={"Elimina sensore"} description={"Vuoi davvero cancellare il sensore?"} id={props.sensor.id} confirm={deleteSensor} />
      </tr>
  )
};
SensorRow.propTypes = {
    sensor:PropTypes.object.isRequired
};
export default SensorRow;
