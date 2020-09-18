import axios from "axios";
import config from "../config";

const EMPTY_CART = "EMPTY_CART";
const DELETE_ITEM = "DELETE_ITEM";
const GET_USER_CART = "GET_USER_CART";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";
const SET_PRODUCT_TO_CART = "SET_PRODUCT_TO_CART";
const REGISTER = "REGISTER";
const GET_USERS = "GET_USERS";

const BASE_URI = config.api.base_uri + "/users";

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
        return axios.get(`${BASE_URI}/${userId}/cart`).then((response) => {
            dispatch({
                type: GET_USER_CART,
                payload: response.data,
            });
        });
    };
}

export function emptyCart(userId) {
    return (dispatch) => {
        return axios.delete(`${BASE_URI}/${userId}/cart`).then(() => {
            dispatch({
                type: EMPTY_CART,
            });
        });
    };
}

export function changeQuantity(userId, body) {
    return (dispatch) => {
        return axios
            .put(`${BASE_URI}/${userId}/cart`, body)
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
            .delete(`${BASE_URI}/${userId}/cart/${productId}`)
            .then(() => {
                dispatch({
                    type: DELETE_ITEM,
                    payload: productId,
                });
            });
    };
}

export function setProductToCart(productId, quantity) {
    const user_id = 1;
    return (dispatch) => {
        console.log("paso 1");
        return axios
            .post(config.api.base_uri + "/orders/" + user_id, {
                status: "shopping_cart",
            })
            .then(() => {
                console.log("paso 2");
                axios
                    .post(BASE_URI + "/" + user_id + "/cart", {
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
