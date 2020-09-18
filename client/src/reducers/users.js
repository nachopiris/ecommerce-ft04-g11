const initialState = {
    userCart: [],
    user: {},
};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_USERS":
            return {
                ...state,
                users: action.payload,
            };
        case "SET_PRODUCT_TO_CART":
            return {
                ...state,
                userCart: state.userCart.concat(action.payload),
            };
        case "GET_USER_CART":
            let cart = [];
            if (Array.isArray(action.payload)) {
                cart = action.payload;
            }
            return {
                ...state,
                userCart: cart,
            };
        case "EMPTY_CART":
            return {
                ...state,
                userCart: [],
            };
        case "CHANGE_QUANTITY":
            let userCartForQuantity = state.userCart;
            const orderForQuantity = userCartForQuantity.findIndex(
                (order) => order.productId === action.payload.productId
            );
            userCartForQuantity.splice(orderForQuantity, 1, action.payload);
            return {
                ...state,
                userCart: userCartForQuantity,
            };
        case "DELETE_ITEM":
            let userCartForDelete = state.userCart;
            const orderForDelete = userCartForDelete.findIndex(
                (order) => order.productId === action.payload
            );
            userCartForDelete.splice(orderForDelete, 1);
            return {
                ...state,
                userCart: userCartForDelete,
            };
        default:
            return state;
    }
}
