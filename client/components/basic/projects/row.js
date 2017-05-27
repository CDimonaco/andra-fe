/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"
import {Link} from "react-router-dom"

export default class ProjectRow extends React.Component{
    constructor(props){
        super(props);
        this.deleteProject = this.deleteProject.bind(this);
        this.state = {project:{},listindex:""}
    }

    componentWillMount(){
        if(this.props.project){
            this.setState({project:this.props.project})
        }

        if(this.props.listindex){
            this.setState({listindex:this.props.listindex})
        }

    }

    deleteProject(){
        //TODO:PUT CONFIRMATION MODAL
        this.props.handleDelete(this.state.project.id);
    }

    render(){
        if(!this.state.project){
            return(<tr></tr>);
        }

        return(

            <tr>
                <td>{this.state.listindex}</td>
                <td>{this.state.project.id}</td>
                <td>{this.state.project.name}</td>
                <td>{this.state.project.description}</td>
                <td>{this.state.project.createdAt}</td>
                <td>
                    <button className="btn btn-danger" onClick={this.deleteProject}>Elimina progetto</button>
                    <Link to={"/projects/"+this.state.project.id+"/sensors"}><button style={{marginRight:6}} className="btn btn-success">Sensori</button></Link>
                </td>
            </tr>
        );
    }
}