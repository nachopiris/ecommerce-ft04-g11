import config from "../config";
import Axios from "axios";

const BASE_URI = config.api.base_uri + "/auth";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export function login(attributes) {
    return (dispatch) => {
        return Axios.post(BASE_URI + "/login", attributes)
            .then((res) => res.data)
            .then((res) => {
                dispatch({ type: LOGIN, payload: res }); // res = {user:{}, token:''}
            });
    };
}

export function logout(token) {
    return (dispatch) => {
        return Axios.post(BASE_URI + "/logout", token)
            .then((res) => res.data)
            .then((res) => {
                //localStorage.clear(); // se limpia absolutamente todo el localstorage
                dispatch({ type: LOGOUT });
            });
    };
}
