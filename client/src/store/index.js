import { createStore, applyMiddleware, combineReducers } from "redux";
import productsReducer from "../reducers/products";
import categoriesReducer from "../reducers/categories";
import thunk from "redux-thunk";

const store = createStore(
    combineReducers({categoriesReducer, productsReducer}),
    applyMiddleware(thunk)
);

export default store;