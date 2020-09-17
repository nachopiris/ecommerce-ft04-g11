const initialState = {
    token: "",
    user: {
        id: null,
        fullname: null,
        email: null,
        address: null,
        dni: null,
        phone: null,
        role: null,
    },
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN":
            console.log(action.payload);
            return {
                ...state,
                user: action.payload.user,
            };
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
}
