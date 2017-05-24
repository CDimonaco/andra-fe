/**
 * Created by cdimonaco on 24/05/2017.
 */
import React from "react"

export default class UserRow extends React.Component{
    constructor(props){
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
        this.state = {users:{},listindex:""}
    }

    componentDidMount(){
        if(this.props.users){
            this.setState({users:this.props.users})
        }

        if(this.props.listindex){
            this.setState({listindex:this.props.listindex})
        }
    }
    deleteUser(id){
        console.log("Delete user inside component");
        this.props.handleDelete(id);
    }

    render(){
        if(!this.state.users){
            return(<tr></tr>);
        }

        return(

            <tr>
                <td>{this.state.listindex}</td>
                <td>{this.state.users.id}</td>
                <td>{this.state.users.username}</td>
                <td>{this.state.users.role}</td>
                <td>{this.state.users.email}</td>
                <td>
                    <button className="btn btn-danger" onClick={this.deleteUser.bind(this.state.users.id)}>Elimina Utente</button>
                </td>
            </tr>
        );
    }
}