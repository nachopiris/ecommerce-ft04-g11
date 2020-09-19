import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import productsReducer from "../reducers/products";
import categoriesReducer from "../reducers/categories";
import ordersReducer from "../reducers/orders";
import globalReducer from "../reducers/global";
import persistState from "redux-localstorage";
import usersReducer from "../reducers/users";
import guestReducer from '../reducers/guest';
import authReducer from "../reducers/auth";
import thunk from "redux-thunk";

const store = createStore(
    combineReducers({
        categoriesReducer,
        productsReducer,
        usersReducer,
        ordersReducer,
        globalReducer,
        authReducer,
        guestReducer
    }),
    compose(applyMiddleware(thunk), persistState(["authReducer","guestReducer"]))
);

//localStorage.clear();
export default store;
