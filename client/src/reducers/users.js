const initialState = {
    userCart: {products:[]},
    totalCost: 0,
    users: [],
    orders: [],
    user: {},
    orderlines: [],
    reviews: []
};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case 'ORDER_CREATED':
            return {
                ...state,
                userCart:{products:[]}
            }
        case 'GET_USER_REVIEWS':
            return {
                ...state,
                reviews: action.payload
            }
        case 'GET_USER_ORDERLINES':
            return {
                ...state,
                orderlines: action.payload
            }
        case 'GET_USER_ORDERS':
            return {
                ...state,
                orders: action.payload
            }
        case 'GET_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'DELETE_USER':
            return {
                ...state
            };
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map(item => {
                    if(item.id === action.payload.id){
                        item = action.payload;
                    }
                    return item;
                })
            };
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
                userCart:{...state.userCart, products:state.userCart.products.concat(action.payload)},
            };
        case "GET_USER_CART":
            return {
                ...state,
                userCart: action.payload
            };
        case "EMPTY_CART":
            return {
                ...state,
                userCart: {products:[]},
            };
        case "CHANGE_QUANTITY":
            return {
                ...state,
                userCart: {
                    ...state.userCart,
                    products: state.userCart.products.map(item => {
                        if(item.id === action.payload.productId){
                            item.orderline.quantity = action.payload.quantity;
                        }
                        return item;
                    }),
                }
            };
        case "DELETE_ITEM":
            return {
                ...state,
                userCart: {
                    ...state.userCart,
                    products: state.userCart.products.filter(item => item.id !== action.payload)
                }
            };
        default:
            return state;
    }
}
