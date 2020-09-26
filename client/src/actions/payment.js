import Axios from "axios";
import config from "../config";
const BASE_URI = config.api.base_uri + "/checkout";

export function payOrder(token, products) {
  return (dispatch) => {
    return Axios.post(
      BASE_URI + "/payment",
      { products },
      { headers: { "x-access-token": token } }
    );
  };
}
