/**
 * Created by cdimonaco on 24/05/2017.
 */
import React from "react"
import {Link} from "react-router-dom"


const UserRow = (props) =>{

    const deleteUser = (e) =>{
        if(props.currentUsername === props.users.username){
            alert("Non puoi cancellare il tuo utente!"); //TODO:ALSO IN BACKEND
            return
        }
        props.handleDelete(props.users.id);
    };

    if(!props.users){
        return <tr></tr>
    }
    return(
        <tr>
            <td>{props.listindex}</td>
            <td>{props.users.id}</td>
            <td>{props.users.username}</td>
            <td>{props.users.role}</td>
            <td>{props.users.email}</td>
            <td>
                <button className="btn btn-danger" onClick={deleteUser}>Elimina utente</button>
                <Link to={"/admin/project/"+props.users.id}><button style={{marginLeft:6}} className="btn btn-success">Progetti</button></Link>
            </td>
        </tr>
    );
};

export default UserRow;