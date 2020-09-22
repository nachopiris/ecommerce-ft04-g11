import config from "../config";
import Axios from "axios";

const BASE_URI = config.api.base_uri + "/auth";
const USER_URI = config.api.base_uri + "/users";
const LOGIN = "LOGIN";
const GOOGLE_LOGIN = "GOOGLE_LOGIN";
const LOGOUT = "LOGOUT";
const REGISTER = "REGISTER";
const PASSWORD_RESET = "PASSWORD_RESET";

const handleCart = async (guestCart, { user, token }) => {
  if (guestCart.length) {
    Axios.post(config.api.base_uri + "/orders/" + user.id, {
      status: "shopping_cart",
    }).then(() => {
      Axios.get(USER_URI + "/" + user.id + "/cart").then((res) => {
        console.log(res.data);
        if (res.data && Array.isArray(res.data)) {
          res.data.forEach(async (element) => {
            let index = guestCart.findIndex(
              (item) => item.id === element.productId
            );
            if (index >= 0) {
              const cartData = {
                idProduct: element.productId,
                quantityProduct: guestCart[index].quantity,
              };
              await Axios.put(USER_URI + "/" + user.id + "/cart", cartData);
              guestCart.splice(index, 1);
            }
          });
        }
        console.log(guestCart);
        guestCart.forEach(async (element) => {
          const cartData = {
            idProduct: element.id,
            quantityProduct: element.quantity,
          };
          await Axios.post(USER_URI + "/" + user.id + "/cart", cartData);
        });
      });
    });
  }
};

export function googleLogin({ tokenId, guestCart }) {
  return (dispatch) => {
    return Axios.post(BASE_URI + "/login-google", { tokenId })
      .then((res) => res.data)
      .then((res) => {
        handleCart(guestCart, res);
        dispatch({ type: GOOGLE_LOGIN, payload: res }); // res = {user:{}, token:''}
        return res;
      })
      .catch(() => {
        dispatch({ type: GOOGLE_LOGIN, payload: { user: {}, token: null } }); // res = {user:{}, token:''}
      });
  };
}

export function login({ attributes, guestCart }) {
  return (dispatch) => {
    return Axios.post(BASE_URI + "/login", attributes)
      .then((res) => res.data)
      .then((res) => {
        handleCart(guestCart, res);
        dispatch({ type: LOGIN, payload: res }); // res = {user:{}, token:''}
        return res;
      })
      .catch(() => {
        dispatch({ type: LOGIN, payload: { user: {}, token: null } }); // res = {user:{}, token:''}
      });
  };
}

export function register(attributes) {
  return (dispatch) => {
    return Axios.post(BASE_URI + "/register", attributes)
      .then((res) => res.data)
      .then((res) => {
        dispatch({ type: REGISTER, payload: res }); // res = {user:{}, token:''}
        return res;
      })
      .catch(() => {
        dispatch({ type: LOGIN, payload: { user: {}, token: null } }); // res = {user:{}, token:''}
      });
  };
}

export function logout(token) {
  return (dispatch) => {
    let headers = { "x-access-token": token };
    return Axios.post(BASE_URI + "/logout", {}, { headers }).then(() => {
      dispatch({ type: LOGOUT });
    });
  };
}

export function passwordReset(email) {
  return (dispatch) => {
    return Axios.post(BASE_URI + "/password-reset", { email }).then(() => {
      dispatch({ type: PASSWORD_RESET });
    });
  };
}

export function passwordChange(data) {
  return (dispatch) => {
    console.log(data);
    return Axios.put(BASE_URI + "/password-reset", data).then(() => {
      dispatch({ type: PASSWORD_RESET });
    });
  };
}
