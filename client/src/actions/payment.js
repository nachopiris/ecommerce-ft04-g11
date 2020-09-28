import Axios from "axios";
import config from "../config";
import {handle as errorsHandler} from '../errorsHandler';
const BASE_URI = config.api.base_uri + "/checkout";

const SET_ERROR = 'SET_ERROR'

export function payOrder(token, orderId) {
  return (dispatch) => {
    return Axios.post(
      BASE_URI + "/payment",
      { orderId },
      { headers: { "x-access-token": token } }
    ).catch(err => {
      dispatch({type:SET_ERROR,payload:errorsHandler(err)})
  })
  };
}

export function getNotPayedOrder(token, orderId) {
  return (dispatch) => {
    return Axios.get(
      BASE_URI + `/failure-order/${orderId}`, { headers: { "x-access-token": token } }
    ).catch(err => {
      dispatch({type:SET_ERROR,payload:errorsHandler(err)})
  })
  }
}
