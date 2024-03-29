import { toast } from "react-toastify";

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_ITEM_QUANTITY,
  DECREMENT_ITEM_QUANTITY,
} from "../types";
import { cartItemKey } from "../../../common/constants";
import { toastSuccess } from "../../../helperfuncs/toast";

export const itemAlreadyInCart = (items, product) => {
  let itemsInCart = false;

  let currentCartItems = items.slice();

  currentCartItems.forEach((item) => {
    if (item.id === product.id) {
      itemsInCart = true;
    }
  });

  return itemsInCart;
};

export const addToCart = (items, product) => (dispatch) => {
  const cartItems = items.slice();
  let productInCart = false;

  cartItems.forEach((item) => {
    if (item.id === product.id) {
      toastSuccess(`${product.title} quantity incremented in cart`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 10000,
      });
      productInCart = true;
      item.count += 1;
    }
  });

  if (!productInCart) {
    toastSuccess(`${product.title} added cart`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1000,
    });
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
