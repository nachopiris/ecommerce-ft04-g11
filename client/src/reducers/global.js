const initialState = {
        loading: false
}

export default function categoriesReducer(state = initialState, action) {
        switch (action.type) {
                case 'SWITCH_LOADING':
                        return {
                                ...state,
                                loading: action.payload
                        }
                default:
                        return state;
        }
}