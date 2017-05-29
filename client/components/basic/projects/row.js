/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import {Link} from "react-router-dom"

const ProjectRow = (props) => {
    const deleteProject = (e) =>{
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
            <button className="btn btn-danger" onClick={deleteProject}>Elimina progetto</button>
            <Link to={"/projects/"+props.project.id+"/sensors"}><button style={{marginLeft:6}} className="btn btn-success">Sensori</button></Link>
        </td>
    </tr>);
};
export default ProjectRow;