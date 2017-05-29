/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"

const ProjectRow = (props) =>{
  if(!props.project){
      return <tr></tr>
  }

  return(
      <tr>
          <td>{props.listindex}</td>
          <td>{props.project.id}</td>
          <td>{props.project.name}</td>
          <td>{props.project.description}</td>
          <td>{props.project.createdAt}</td>
          <td>
              <Link to={"/admin/project/"+props.project.id+"/sensors"}><button style={{marginLeft:6}} className="btn btn-success">Sensori</button></Link>
          </td>
      </tr>
  );
};
ProjectRow.propTypes = {
  project:PropTypes.object.isRequired
};
export default ProjectRow;
