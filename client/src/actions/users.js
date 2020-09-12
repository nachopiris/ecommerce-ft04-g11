import axios from "axios";
import config from "../config";

const GET_USER_CART = "GET_USER_CART";
const EMPTY_CART = "EMPTY_CART";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";
const DELETE_ITEM = "DELETE_ITEM";

const BASE_URI = config.api.base_uri + "/users";

export function getUserCart(userId) {
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
    return axios.put(`${BASE_URI}/${userId}/cart`, body).then((response) => {
      dispatch({
        type: CHANGE_QUANTITY,
        payload: response.data,
      });
    });
  };
}

export function deleteItem(userId, productId) {
  return (dispatch) => {
    return axios.delete(`${BASE_URI}/${userId}/cart/${productId}`).then(() => {
      dispatch({
        type: DELETE_ITEM,
        payload: productId,
      });
    });
  };
}
