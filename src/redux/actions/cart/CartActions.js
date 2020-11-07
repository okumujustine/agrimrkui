import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_ITEM_QUANTITY,
  DECREMENT_ITEM_QUANTITY,
} from "../types";
import { cartItemKey } from "../../../common/constants";

export const addToCart = (items, product) => (dispatch) => {
  const cartItems = items.slice();
  let productInCart = false;

  cartItems.forEach((item) => {
    if (item.id === product.id) {
      productInCart = true;
      item.count += 1;
    }
  });

  if (!productInCart) {
    cartItems.push({ ...product, count: 1 });
  }

  updateCartStorage(cartItems);

  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
};

export const removeFromCart = (items, product) => (dispatch) => {
  const cartItems = items.slice().filter((a) => a.id !== product.id);
  updateCartStorage(cartItems);
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
};

export const incrementItemQuantity = (items, product) => (dispatch) => {
  const cartItems = items.slice();

  cartItems.forEach((item) => {
    if (item.id === product.id) {
      item.count += 1;
    }
  });

  updateCartStorage(cartItems);

  dispatch({
    type: INCREMENT_ITEM_QUANTITY,
    payload: { cartItems },
  });
};

export const decrementItemQuantity = (items, product) => (dispatch) => {
  let cartItems = items.slice();

  if (product.count === 1) {
    cartItems = items.slice().filter((a) => a.id !== product.id);
    updateCartStorage(cartItems);

    dispatch({
      type: REMOVE_FROM_CART,
      payload: { cartItems },
    });
    return;
  }

  cartItems.forEach((item) => {
    if (item.id === product.id) {
      item.count -= 1;
    }
  });

  updateCartStorage(cartItems);

  dispatch({
    type: DECREMENT_ITEM_QUANTITY,
    payload: { cartItems },
  });
};

const updateCartStorage = (cartItems) => {
  localStorage.setItem(cartItemKey, JSON.stringify(cartItems));
};
