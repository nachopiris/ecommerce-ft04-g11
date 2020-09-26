import Axios from 'axios';
import config from '../config';

const GET_ORDERS = 'GET_ORDERS';
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';
const REMOVE_ORDER = 'REMOVE_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';

const BASE_URI = config.api.base_uri + '/orders';

export function updateOrderStatus(id, data) {
    return dispatch => {
        return Axios.put(BASE_URI + "/" + id, data)
            .then(res => res.data)
            .then(res => {
                dispatch({ type: UPDATE_ORDER_STATUS })
            })
    }
}

export function getOrders() {
    return dispatch => {
        return Axios.get(BASE_URI)
            .then(res => res.data)
            .then(res => {
                dispatch({ type: GET_ORDERS, payload: res.data });
            });
    }
}

export function removeOrder({ id, token }) {
    console.log(token);
    return dispatch => {
        return Axios.delete(BASE_URI + '/' + id, { headers: { 'x-access-token': token } })
            .then(() => {
                dispatch({ type: REMOVE_ORDER, payload: id });
            })
    }
}

export function updateOrder({ id, status, token }) {
    console.log(token);
    return dispatch => {
        return Axios.put(BASE_URI + '/' + id, { status }, { headers: { 'x-access-token': token } })
            .then(res => {
                console.log(res.data.data)
                dispatch({ type: UPDATE_ORDER, payload: res.data.data });
            })
    }
}