import axios from "axios";
import { toast } from "react-toastify";

import { tokenConfig } from "../auth/authActions";
import { ORDERS_LOADING, ORDERS_FAILED, ORDERS_SUCCESS } from "../types";

export const addOrders = () => (dispatch, getState) => {
  dispatch({
    type: ORDERS_LOADING,
  });

  const cartItems = JSON.parse(localStorage.getItem("cartItems"));

  const body = { order: cartItems };

  axios
    .post("http://127.0.0.1:5000/orders/add", body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ORDERS_SUCCESS,
      });
      toast.success("Order successfully sent!");
    })
    .catch((error) => {
      dispatch({
        type: ORDERS_FAILED,
        payload: error.response.data.message,
      });
      toast.error(error.response.data.message);
    });
};
