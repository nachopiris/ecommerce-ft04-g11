const initialState = {
  token: null,
  user: {},
};

export default function authReducer(state = initialState, action) {
<<<<<<< admin-user-component
    switch (action.type) {
        case "GIVE_ADMIN_RIGHTS":
            return state;
        case "GIVE_USER_RIGHTS":
            return state;
        case "REGISTER":
            return action.payload;
        case "LOGIN":
            return action.payload;
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
=======
  switch (action.type) {
    case "REGISTER":
      return action.payload;
    case "LOGIN":
      return action.payload;
    case "GOOGLE_LOGIN":
      return action.payload;
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
>>>>>>> master
}
