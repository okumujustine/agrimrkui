import { combineReducers } from "redux";
import productsReducer from "./products/productsReducer";
import cartReducer from "./cart/cartReducer";
import authReducer from "./auth/authReducer";
import errorsReducer from "./errors/errorsReducer";

export default combineReducers({
  productsReducer,
  cartReducer,
  authReducer,
  errorsReducer,
});
