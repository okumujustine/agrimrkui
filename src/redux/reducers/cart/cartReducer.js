import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_ITEM_QUANTITY,
  DECREMENT_ITEM_QUANTITY,
} from "../../actions/types";

const initialState = {
  cartItems: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cartItems: action.payload.cartItems };
    case REMOVE_FROM_CART:
      return { ...state, cartItems: action.payload.cartItems };
    case INCREMENT_ITEM_QUANTITY:
      return { ...state, cartItems: action.payload.cartItems };
    case DECREMENT_ITEM_QUANTITY:
      return { ...state, cartItems: action.payload.cartItems };
    default:
      return state;
  }
};
