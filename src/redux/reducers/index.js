import { combineReducers } from "redux";
import productsReducer from "./products/productsReducer";
import cartReducer from "./cart/cartReducer";
import authReducer from "./auth/authReducer";

export default combineReducers({
  productsReducer,
  cartReducer,
  authReducer,
});
