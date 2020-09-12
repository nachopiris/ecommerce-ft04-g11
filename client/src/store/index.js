import { createStore, applyMiddleware, combineReducers } from "redux";
import productsReducer from "../reducers/products";
import categoriesReducer from "../reducers/categories";
import usersReducer from "../reducers/users";
import thunk from "redux-thunk";

const store = createStore(
  combineReducers({ categoriesReducer, productsReducer, usersReducer }),
  applyMiddleware(thunk)
);

export default store;
