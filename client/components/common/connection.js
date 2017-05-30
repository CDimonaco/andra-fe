/**
 * Created by cdimonaco on 24/05/2017.
 */

const devBase = "http://34.251.171.152/api";


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
let newUser = function (token,body,success,error) {
    $.ajax({
        url: devBase + "/user",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        headers:{
            "Authorization" : "Bearer "+token
        },
        timeout: 30000,
        data: JSON.stringify(body),
        success: function(data) {
            success(data);
        }.bind(this),
        error: function(xhr, status, err) {
            error(xhr, status, err);
        }.bind(this)
    });
};
let newProject = function (token,body,success,error) {
    $.ajax({
        url: devBase + "/projects",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        headers:{
            "Authorization" : "Bearer "+token
        },
        timeout: 30000,
        data: JSON.stringify(body),
        success: function(data) {
            success(data);
        }.bind(this),
        error: function(xhr, status, err) {
            error(xhr, status, err);
        }.bind(this)
    });
};
let newSensor = function (token,projectid,body,success,error) {
    $.ajax({
        url: devBase + "/sensors/"+projectid,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        headers:{
            "Authorization" : "Bearer "+token
        },
        timeout: 30000,
        data: JSON.stringify(body),
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

let getSensors = function(token,project,offset,success, error){
    $.ajax({
        url: devBase + "/sensors/"+project+"?offset=" + offset,
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
let getValues = function(token,sensor,offset,success, error){
    $.ajax({
        url: devBase + "/sensors/value/"+sensor+"?offset=" + offset,
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
let getProjects = function(token,success, error){
    $.ajax({
        url: devBase + "/projects",
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
let getProjectAdmin = function(token,userid,success, error){
    $.ajax({
        url: devBase + "/projects/" + userid,
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
        error: function(Jqxhr, statuscode, errors) {
            error(Jqxhr, statuscode, errors);
        }.bind(this)
    });
};
let deleteUsers = function(token,userid,success, error){
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
let deleteProject = function(token,projectid,success, error){
    $.ajax({
        url: devBase + "/projects/" + projectid,
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
let deleteSensor = function(token,projectid,sensorid,success, error){
    $.ajax({
        url: devBase + "/sensors/" + projectid + "/" + sensorid,
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

export {newSensor,deleteSensor,deleteProject,authenticationBackend,getUsers,deleteUsers,newUser,getProjects,getProjectAdmin,getSensors,getValues,newProject}
