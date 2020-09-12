import Axios from 'axios';
import config from '../config';

const GET_ORDERS = 'GET_ORDERS';

const BASE_URI = config.api.base_uri + '/orders';

export function getOrders() {
    return dispatch => {
        return Axios.get(BASE_URI)
            .then(res => res.data)
            .then(res => {
                dispatch({ type: GET_ORDERS, payload: res.data });
            });
    }
}