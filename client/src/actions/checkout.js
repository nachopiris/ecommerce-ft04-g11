import Axios from 'axios';
import config from '../config';
const BASE_URI = config.api.base_uri + '/checkout';
const BASE_AUTH = config.api.base_uri + '/auth';

export function createOrder(data){ // {token, doc_number, address, phone}
    return dispatch => {
        console.log(data);
        return Axios.post(BASE_URI, data,{headers:{'x-access-token': data.token}});
    }
}

export function processOrder(data){ // {token, orderId}
    return dispatch => {
        return Axios.post(BASE_URI + '/process', data);
    }
}

export function cancelOrder(data){ // {token, orderId}
    return dispatch => {
        return Axios.put(BASE_AUTH + '/orders/cancel', {orderId: data.orderId}, {headers: {'x-access-token':data.token}});
    }
}