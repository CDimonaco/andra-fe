/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import {Link} from "react-router-dom"
import ConfirmationModal from "../../common/confirmationModal.js"
import PropTypes from "prop-types"

const ProjectRow = (props) => {
    const deleteProject = () =>{
        props.handleDelete(props.project.id);
    };
    if(!props.project){
        return <tr></tr>
    }
   return( <tr>
        <td>{props.listindex}</td>
        <td>{props.project.id}</td>
        <td>{props.project.name}</td>
        <td>{props.project.description}</td>
        <td>{props.project.createdAt}</td>
        <td>
            <a data-toggle="modal" data-target={"#"+props.project.id}>
                <button type="button" className="btn btn-danger">
                    Elimina progetto
                </button>
            </a>
            <Link to={"/projects/"+props.project.id+"/sensors"}><button style={{marginLeft:6}} className="btn btn-success">Sensori</button></Link>
        </td>
       <ConfirmationModal title={"Elimina progetto"} description={"Vuoi davvero cancellare il progetto?"} id={props.project.id} confirm={deleteProject} />
   </tr>);
};

ProjectRow.PropTypes = {
  project:PropTypes.object.isRequired
};
export default ProjectRow;