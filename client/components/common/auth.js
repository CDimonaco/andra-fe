/**
 * Created by cdimonaco on 24/05/2017.
 */
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
        localStorage.clear();
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