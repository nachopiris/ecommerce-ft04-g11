const initialState = {
    categories: [],
    category: {}
}

export default function categoriesReducer(state = initialState, action){
    switch (action.type) {
        case 'GET_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }
        case 'GET_CATEGORY':
            return {
                ...state,
                category: action.payload
            }
        case 'CREATE_CATEGORY':
            return {
                ...state,
                category: action.payload,
                categories: [...state.categories, action.payload]
            }

        case 'UPDATE_CATEGORY':
            state.categories.forEach((item, index) => {
                if(item.data.id === action.payload.data.id){
                    state.categories[index] = action.payload
                }
            })
            return {
                ...state,
                category: action.payload
            }
        
        case 'DELETE_CATEGORY':
            if(state.category && state.category.data.id === action.payload) state.category = {};
            return {
                ...state,
                categories: state.categories.filter(item => item.data.id !== action.payload)
            }
        default:
            return state;
    }
}