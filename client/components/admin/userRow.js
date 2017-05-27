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
    deleteUser(){
        console.log("Delete user inside component");
        if(this.props.currentUsername === this.state.users.username){
            alert("Non puoi cancellare il tuo utente!"); //TODO:ALSO IN BACKEND
            return;
        }
        this.props.handleDelete(this.state.users.id);
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
                    <button className="btn btn-danger" onClick={this.deleteUser}>Elimina utente</button>
                </td>
            </tr>
        );
    }
}