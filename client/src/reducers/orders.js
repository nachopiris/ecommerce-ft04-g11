const initialState = {
    orders: []
}

export default function ordersReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ORDERS':
            return {
                ...state,
                orders: action.payload
            }
        case 'REMOVE_ORDER':
            return {
                ...state,
                orders: state.orders.filter(item => item.id !== action.payload)
            }
        case 'UPDATE_ORDER':
            return {
                ...state,
                orders:state.orders.map(item => {
                    if(item.id === action.payload.id) item.status = action.payload.status;
                    return item;
                })
            }
            
        default:
            return state;
    }
}