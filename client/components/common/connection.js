/**
 * Created by cdimonaco on 24/05/2017.
 */

const devBase = "http://localhost:5000";


let authenticationBackend = function(username,password,success,error){
    $.ajax({
        url: devBase + "/auth/login",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        timeout: 30000,
        data: JSON.stringify({"username": username,"password":password}),
        success: function(data) {
            success(data);
        }.bind(this),
        error: function(xhr, status, err) {
            error(xhr, status, err);
        }.bind(this)
    });
};

let getUsers = function(token,offset,success, error){
    $.ajax({
        url: devBase + "/user?offset=" + offset,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        type: 'GET',
        headers:{
            "Authorization" : "Bearer "+token
        },
        timeout: 30000,
        success: function(data) {
            success(data);
        }.bind(this),
        error: function(xhr, status, err) {
            error(xhr, status, err);
        }.bind(this)
    });
};

var deleteUsers = function(token,userid,success, error){
    $.ajax({
        url: devBase + "/user/" + userid,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        type: 'DELETE',
        headers:{
            "Authorization" : "Bearer "+token
        },
        timeout: 30000,
        success: function(data) {
            success(data);
        }.bind(this),
        error: function(xhr, status, err) {
            error(xhr, status, err);
        }.bind(this)
    });
};
export default {login:authenticationBackend,getUsers:getUsers,deleteUsers:deleteUsers}