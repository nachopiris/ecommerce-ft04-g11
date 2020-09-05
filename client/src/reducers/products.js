const initialState = {
    products: [],
    product: {}
}

export default function productsReducer(state = initialState, action){
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }
        case 'GET_PRODUCT':
            return {
                ...state,
                product: action.payload
            }
        case 'CREATE_PRODUCT':
            return {
                ...state,
                product: action.payload,
                products: [...state.products, action.payload]
            }

        case 'UPDATE_PRODUCT':
            state.products.forEach((item, index) => {
                if(item.data.id === action.payload.data.id){
                    state.products[index] = action.payload
                }
            })
            return {
                ...state,
                product: action.payload
            }
        
        case 'DELETE_PRODUCT':
            if(state.product.data && state.product.data.id === action.payload) state.product = {};
            return {
                ...state,
                products: state.products.filter(item => item.data.id !== action.payload)
            }
        default:
            return state;
    }
}