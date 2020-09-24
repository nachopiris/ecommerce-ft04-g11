import Axios from 'axios';
import config from '../config';

const GET_ORDERS = 'GET_ORDERS';
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';

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