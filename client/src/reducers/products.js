const initialState = {
    products: {
        count: 0,
        rows: []
    },
    reviews: [],
    avgReviews: [],
    product: [],
    search: "",
}

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_AVERAGE_REVIEWS':
            return {
                ...state,
                avgReviews: action.payload
            }
        case 'GET_REVIEWS':
            return {
                ...state,
                reviews: action.payload
            }
        case 'GET_LATESTS':
            return {
                ...state,
                products: action.payload
            }
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
            if (!products) products = { count: 0, rows: [] };
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
                product: action.payload
            }

        case 'UPDATE_PRODUCT':
            return {
                ...state,
            }

        case 'DELETE_PRODUCT':

            return {
                ...state,
            }
        default:
            return state;
    }
}