import Axios from 'axios';
import config from '../config';
import {handle as errorsHandler} from '../errorsHandler';

const BASE_URI = config.api.base_uri + '/checkout';
const BASE_AUTH = config.api.base_uri + '/auth';
const ORDER_CREATED = 'ORDER_CREATED';
const SET_ERROR = 'SET_ERROR';

export function createOrder(data){ // {token, doc_number, address, phone}
    return dispatch => {
        console.log(data);
        return Axios.post(BASE_URI, data,{headers:{'x-access-token': data.token}})
        .then(() => {
            dispatch({type: ORDER_CREATED});
        })
        .catch((err) => {
            dispatch({type:SET_ERROR,payload:errorsHandler(err)})
        });
    }
}

export function processOrder(token, orderId){ // {token, orderId}
    return dispatch => {
        return Axios.post(BASE_URI + '/process', {orderId}, {headers: {'x-access-token':token}})
        .catch(err => {
            dispatch({type:SET_ERROR,payload:errorsHandler(err)})
        })
    }
}

export function cancelOrder(data){ // {token, orderId}
    return dispatch => {
        return Axios.put(BASE_AUTH + '/orders/cancel', {orderId: data.orderId}, {headers: {'x-access-token':data.token}})
        .catch((err) => {
            dispatch({type:SET_ERROR,payload:errorsHandler(err)})
        });
    }
}