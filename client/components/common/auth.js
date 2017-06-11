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
        logout(localStorage.getItem("token"),
            function (data) {
              localStorage.clear();
        },function (xhr,status,err) {
            if(xhr.status === 401) {
                localStorage.clear();
            }
        });
        return localStorage.getItem('token') === null;
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