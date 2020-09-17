import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import productsReducer from "../reducers/products";
import categoriesReducer from "../reducers/categories";
import ordersReducer from "../reducers/orders";
import usersReducer from "../reducers/users";
import authReducer from "../reducers/auth";
import globalReducer from "../reducers/global";
import persistState from "redux-localstorage";
import thunk from "redux-thunk";

const store = createStore(
    combineReducers({
        categoriesReducer,
        productsReducer,
        usersReducer,
        ordersReducer,
        globalReducer,
        authReducer,
    }),
    compose(applyMiddleware(thunk), persistState("authReducer"))
);

//localStorage.clear();
export default store;
