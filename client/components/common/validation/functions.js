/**
 * Created by cdimonaco on 27/05/2017.
 */
import validationConstraints from "./constraints.js";
import Validate from "validate.js/"

export let validateNewUser = function (username,password,email,ruolo) {
    let response = [];
    let validation = Validate.validate({username:username,password:password,email:email,ruolo:parseInt(ruolo)},validationConstraints["newUser"]);
    if (validation !== undefined){
        for(let key in validation){
            //Ogni chiave del dizionario, quindi un errore di validazione
            let value = validation[key];
            value.map(function (item) {
                response.push(item);
            });
        }
    }
    return response;
};