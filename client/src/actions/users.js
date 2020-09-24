import axios from "axios";
import config from "../config";

const EMPTY_CART = "EMPTY_CART";
const DELETE_ITEM = "DELETE_ITEM";
const GET_USER_CART = "GET_USER_CART";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";
const SET_PRODUCT_TO_CART = "SET_PRODUCT_TO_CART";
const REGISTER = "REGISTER";
const GET_USERS = "GET_USERS";
const GET_ORDERS = "GET_ORDERS";
const UPDATE_USER = "UPDATE_USER";
const GIVE_ADMIN_RIGHTS = "GIVE_ADMIN_RIGHTS";
const GIVE_USER_RIGHTS = "GIVE_USER_RIGHTS";
const DELETE_USER = "DELETE_USER";
const GET_USER = "GET_USER";
const GET_USER_ORDERS = "GET_USER_ORDERS";
const GET_USER_ORDERLINES = 'GET_USER_ORDERLINES';

const BASE_URI = config.api.base_uri + "/users";
const BASE_AUTH = config.api.base_uri + "/auth";
const getUserId = () => {
    return localStorage.redux ? JSON.parse(localStorage.redux).authReducer.user.id : null;
}


export function getUserOrderlines(id) {
    return dispatch => {
        return axios.get(BASE_URI + '/' + id + '/orderline')
            .then(res => res.data)
            .then(res => {
                dispatch({ type: GET_USER_ORDERLINES, payload: res.data });
            });
    }
}


export function getUserOrders(id) {
    return dispatch => {
        return axios.get(BASE_URI + "/" + id + "/allorders")
            .then(res => res.data)
            .then(res => {
                dispatch({ type: GET_USER_ORDERS, payload: res.data });
            });
    }
}

export function getUser(id) {
    return dispatch => {
        return axios.get(BASE_URI + '/' + id)
            .then(res => res.data)
            .then(res => {
                dispatch({ type: GET_USER, payload: res.data });
            })
    }
}

export function deleteUser(id) {
    return dispatch => {
        return axios.delete(BASE_URI + '/' + id)
            .then(res => res.data)
            .then(res => {
                dispatch({ type: DELETE_USER });
            })
    }
}

export function giveAdminRights(id) {
    return dispatch => {
        return axios.post(BASE_AUTH + '/promote/' + id)
            .then(res => res.data)
            .then(res => {
                dispatch({ type: GIVE_ADMIN_RIGHTS });
            })
    }
}

export function giveUserRights(id) {
    return dispatch => {
        return axios.post(BASE_AUTH + '/remove/' + id)
            .then(res => res.data)
            .then(res => {
                dispatch({ type: GIVE_USER_RIGHTS });
            })
    }
}

export function updateUser(id, data) {
    return dispatch => {
        return axios.put(BASE_URI + '/' + id, data)
            .then(res => res.data)
            .then(res => {
                dispatch({ type: UPDATE_USER });
            })
    }
}

export function getUsers() {
    return (dispatch) => {
        return axios
            .get(BASE_URI)
            .then((res) => res.data)
            .then((res) => {
                dispatch({ type: GET_USERS, payload: res.data });
            });
    };
}

export function getUserCart() {
    const userId = 1;
    return (dispatch) => {
        return axios.get(`${BASE_URI}/${getUserId()}/cart`).then((response) => {
            dispatch({
                type: GET_USER_CART,
                payload: response.data,
            });
        });
    };
}

export function emptyCart(userId) {
    return (dispatch) => {
        return axios.delete(`${BASE_URI}/${getUserId()}/cart`).then(() => {
            dispatch({
                type: EMPTY_CART,
            });
        });
    };
}

export function changeQuantity(userId, body) {
    return (dispatch) => {
        return axios
            .put(`${BASE_URI}/${getUserId()}/cart`, body)
            .then((response) => {
                dispatch({
                    type: CHANGE_QUANTITY,
                    payload: response.data,
                });
            });
    };
}

export function deleteItem(userId, productId) {
    return (dispatch) => {
        return axios
            .delete(`${BASE_URI}/${getUserId()}/cart/${productId}`)
            .then(() => {
                dispatch({
                    type: DELETE_ITEM,
                    payload: productId,
                });
            });
    };
}

export function setProductToCart(productId, quantity) {
    return (dispatch) => {
        return axios
            .post(config.api.base_uri + "/orders/" + getUserId(), {
                status: "shopping_cart",
            })
            .then(() => {
                axios
                    .post(BASE_URI + "/" + getUserId() + "/cart", {
                        idProduct: productId,
                        quantityProduct: quantity,
                    })
                    .then((res) => res.data)
                    .then((res) => {
                        dispatch({
                            type: SET_PRODUCT_TO_CART,
                            payload: res,
                        });
                    });
            });
    };
}


export function getOrders(token) {
    return dispatch => {
        return axios.get(BASE_AUTH + '/orders', { headers: { 'x-access-token': token } })
            .then(res => res.data)
            .then(res => {
                dispatch({ type: GET_ORDERS, payload: res.data })
            })
    }
}