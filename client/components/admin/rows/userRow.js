/**
 * Created by cdimonaco on 24/05/2017.
 */
import React from "react"
import {Link} from "react-router-dom"
import ConfirmationModal from "./../../common/confirmationModal.js"
import PropTypes from "prop-types"

const UserRow = (props) =>{

    const deleteUser = () =>{
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
                <a data-toggle="modal" data-target={"#"+props.users.id}>
                    <button type="button" className="btn btn-danger">
                        Elimina utente
                    </button>
                </a>
                <Link to={"/admin/project/"+props.users.id}><button style={{marginLeft:6}} className="btn btn-success">Progetti</button></Link>
            </td>
            <ConfirmationModal title={"Elimina utente"} description={"Vuoi davvero cancellare l'utente?"} id={props.users.id} confirm={deleteUser} />
        </tr>
    );
};

UserRow.propTypes = {
    users:PropTypes.object.isRequired
};
export default UserRow;