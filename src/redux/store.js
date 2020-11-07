import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import { cartItemKey } from "../common/constants";

const cartItems = localStorage.getItem(cartItemKey)
  ? JSON.parse(localStorage.getItem(cartItemKey))
  : [];

const initialState = {
  cartReducer: {
    cartItems: cartItems,
  },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
