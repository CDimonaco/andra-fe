/**
 * Created by cdimonaco on 24/05/2017.
 */
import {logout} from "./connection"

class Auth {

    static authenticateUser(token,role,username) {
        localStorage.setItem('token', token);
        localStorage.setItem("role",role);
        localStorage.setItem("username",username)
    }

    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    static deauthenticateUser() {
        console.log(localStorage.getItem('token'));
        let deauthResult = false;
        logout(localStorage.getItem("token"),
            function (data) {
              localStorage.clear();
              return deauthResult=true;
        },function (xhr,status,err) {
            if(xhr.status === 401 && xhr.responseJSON["message"]){
                localStorage.clear();
                deauthResult=true;
            }else{
                console.log("Error during logout");
                deauthResult=false;
            }
        });
        return deauthResult;
    }
    static getUsername(){
        return localStorage.getItem('username');
    }


    static getToken() {
        return localStorage.getItem('token');
    }

    static getRole(){
        return localStorage.getItem("role");
    }

}

export default Auth;