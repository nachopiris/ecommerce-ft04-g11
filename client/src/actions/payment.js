import Axios from "axios";
import config from "../config";
const BASE_URI = config.api.base_uri + "/checkout";

export function payOrder(user, data, products) {
  return (dispatch) => {
    return Axios.post(BASE_URI + "/payment", { user, data, products });
  };
}
