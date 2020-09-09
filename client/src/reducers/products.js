const initialState = {
    products: [],
    product: {},
    search:"",
}

export default function productsReducer(state = initialState, action){
    switch (action.type) {
        case 'DELETE_CATEGORY_TO_PRODUCT':
            return {
                ...state
            }
        case 'ADD_CATEGORY_TO_PRODUCT':
            return {
                ...state
            }
        case 'SEARCH_PRODUCT':
            return {
                ...state,
                search: action.payload
            }
        case 'FILTER_BY_CATEGORY':
            let products = action.payload;
            if(!products) products = [];
            return {
                ...state,
                products
            }
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
            }

        case 'UPDATE_PRODUCT':
            return {
                ...state,
            }
        
        case 'DELETE_PRODUCT':
            
            if(state.product && state.product.id === action.payload) state.product = {};
            return {
                ...state,
                products: state.products.filter(item => item.id !== action.payload)
            }
        default:
            return state;
    }
}