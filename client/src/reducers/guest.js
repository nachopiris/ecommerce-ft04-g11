const initialState = {
        cart: []
}

export default function guestReducer(state = initialState, action){
        switch (action.type) {
                case "ADD_PRODUCT_TO_CART":
                        console.log(action.payload)
                        return{
                                ...state,
                                cart: state.cart.concat(action.payload)
                        }
                case "REMOVE_PRODUCT_TO_CART":
                        return {
                                ...state,
                                cart: state.cart.filter(item => item.id !== action.payload)
                        }
                case "CHANGE_PRODUCT_QUANTITY":
                        return {
                                ...state,
                                cart: state.cart.map(item => {
                                        if(item.id === action.payload.id){
                                                item.quantity = action.payload.quantity;
                                        }
                                        return item;
                                })
                        }
                case "CLEAR_CART":
                        return{
                                ...state,
                                cart: []
                        }
                default:
                        return state;
        }
}