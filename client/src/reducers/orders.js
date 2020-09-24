const initialState = {
    orders: []
}

export default function ordersReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_ORDER_STATUS':
            return {
                ...state
            }
        case 'GET_ORDERS':
            return {
                ...state,
                orders: action.payload
            }
        default:
            return state;
    }
}