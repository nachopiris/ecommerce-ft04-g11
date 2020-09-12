import { createStore, applyMiddleware, combineReducers } from "redux";
import productsReducer from "../reducers/products";
import categoriesReducer from "../reducers/categories";
import ordersReducer from "../reducers/orders"
import thunk from "redux-thunk";

const store = createStore(
    combineReducers({ categoriesReducer, ordersReducer, productsReducer }),
    applyMiddleware(thunk)
);

export default store;