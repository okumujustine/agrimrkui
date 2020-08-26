import { combineReducers } from "redux";
import productsReducer from "./products/productsReducer";
import cartReducer from "./cart/cartReducer";
import authReducer from "./auth/authReducer";
import ordersReducer from "./orders/ordersReducer";
import blogReducer from "./blog/blogReducer";

export default combineReducers({
  productsReducer,
  cartReducer,
  authReducer,
  ordersReducer,
  blogReducer,
});
