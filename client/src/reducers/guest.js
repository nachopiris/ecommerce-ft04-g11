const initialState = {
  cart: [],
  totalCost: 0,
};

export default function guestReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      let cart = state.cart.concat(action.payload);
      let totalCost = cart.reduce((acc, curr) => {
        return acc + parseInt(curr.price) * curr.quantity;
      }, 0);
      return {
        ...state,
        cart: cart,
        totalCost: totalCost,
      };
    case "REMOVE_PRODUCT_TO_CART":
      let cartForDelete = state.cart.filter(
        (item) => item.id !== action.payload
      );
      let totalCostForDelete = cartForDelete.reduce((acc, curr) => {
        return acc + parseInt(curr.price) * curr.quantity;
      }, 0);
      return {
        ...state,
        cart: cartForDelete,
        totalCost: totalCostForDelete,
      };
    case "CHANGE_PRODUCT_QUANTITY":
      let cartForQuantity = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity = action.payload.quantity;
        }
        return item;
      });
      let totalCostForQuantity = cartForQuantity.reduce((acc, curr) => {
        return acc + parseInt(curr.price) * curr.quantity;
      }, 0);
      return {
        ...state,
        cart: cartForQuantity,
        totalCost: totalCostForQuantity,
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
        totalCost: 0,
      };
    default:
      return state;
  }
}
