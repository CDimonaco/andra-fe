/**
 * Created by cdimonaco on 24/05/2017.
 */
class Auth {

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    static authenticateUser(token,role) {
        localStorage.setItem('token', token);
        localStorage.setItem("role",role)
    }

    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser() {
        localStorage.clear();
    }

    /**
     * Get a token value.
     *
     * @returns {string}
     */

    static getToken() {
        return localStorage.getItem('token');
    }

    static getRole(){
        return localStorage.getItem("role");
    }

}

export default Auth;