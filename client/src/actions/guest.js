const CHANGE_PRODUCT_QUANTITY = "CHANGE_PRODUCT_QUANTITY";
const REMOVE_PRODUCT_TO_CART = "REMOVE_PRODUCT_TO_CART";
const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const CLEAR_CART = "CLEAR_CART";

export function addProductToCart(product) { //{id, name, price, quantity, image, stock}
    return (dispatch) => {
        dispatch({ type: ADD_PRODUCT_TO_CART, payload: product });
    };
}

export function changeProductQuantity(data){ //{productId, quantity}
    return dispatch => {
        dispatch({type: CHANGE_PRODUCT_QUANTITY, payload: data})
    }
}

export function removeProductToCart(id) {
    return (dispatch) => {
        dispatch({ type: REMOVE_PRODUCT_TO_CART, payload: id });
    };
}

export function clearCart() {
    return (dispatch) => {
        dispatch({ type: CLEAR_CART });
    };
}
