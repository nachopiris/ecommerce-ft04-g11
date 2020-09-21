const initialState = {
  userCart: [],
  totalCost: 0,
  user: {},
  orders: [],
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };
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
      let totalCost = cart.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
      }, 0);
      return {
        ...state,
        userCart: cart,
        totalCost: totalCost,
      };
    case "EMPTY_CART":
      return {
        ...state,
        userCart: [],
        totalCost: 0,
      };
    case "CHANGE_QUANTITY":
      let userCartForQuantity = state.userCart;
      const orderForQuantity = userCartForQuantity.findIndex(
        (order) => order.productId === action.payload.productId
      );
      userCartForQuantity.splice(orderForQuantity, 1, action.payload);
      let totalCostForQuantity = userCartForQuantity.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
      }, 0);
      return {
        ...state,
        userCart: userCartForQuantity,
        totalCost: totalCostForQuantity,
      };
    case "DELETE_ITEM":
      let userCartForDelete = state.userCart;
      const orderForDelete = userCartForDelete.findIndex(
        (order) => order.productId === action.payload
      );
      userCartForDelete.splice(orderForDelete, 1);
      let totalCostForDelete = userCartForDelete.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
      }, 0);
      return {
        ...state,
        userCart: userCartForDelete,
        totalCost: totalCostForDelete,
      };
    default:
      return state;
  }
}
