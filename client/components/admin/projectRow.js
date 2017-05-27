/**
 * Created by cdimonaco on 27/05/2017.
 */
import React from "react"

export default class ProjectRow extends React.Component{
    constructor(props){
        super(props);

        this.state = {project:{},listindex:""}
    }

    componentDidMount(){
        if(this.props.project){
            this.setState({project:this.props.project})
        }

        if(this.props.listindex){
            this.setState({listindex:this.props.listindex})
        }

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
                    <button className="btn btn-danger">Sensori</button>
                </td>
            </tr>
        );
    }
}