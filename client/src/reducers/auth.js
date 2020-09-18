const initialState = {
    token: null,
    user: {},
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case "REGISTER":
            return action.payload;
        case "LOGIN":
            return action.payload;
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
}
