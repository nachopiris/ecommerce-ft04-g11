const initialState = {
        loading: false,
        error: null
}

export default function categoriesReducer(state = initialState, action) {
        switch (action.type) {
                case 'SWITCH_LOADING':
                        return {
                                ...state,
                                loading: action.payload
                        }
                case 'SET_ERROR':
                        return {
                                ...state,
                                error: action.payload
                        }
                case 'CLEAR_ERROR':
                        return {
                                ...state,
                                error:null
                        }
                default:
                        return state;
        }
}