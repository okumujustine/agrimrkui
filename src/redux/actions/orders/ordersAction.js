import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

import { tokenConfig } from "../auth/authActions";
import {
  ORDERS_LOADING,
  ORDERS_FAILED,
  ORDERS_SUCCESS,
  HIRE_LIST_LOADED,
} from "../types";
import { baseUrl, cartItemKey } from "../../../common/constants";

export const addOrders = () => (dispatch, getState) => {
  dispatch({
    type: ORDERS_LOADING,
  });

  const cartItems = JSON.parse(localStorage.getItem(cartItemKey));

  const body = { order: cartItems };

  axios
    .post(`${baseUrl}/orders/add`, body, tokenConfig(getState))
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

export const productHireRequest = (product) => (dispatch, getState) => {
  let {
    phone,
    hireNote,
    neededDate,
    returnDate,
    days,
    address,
    productId,
    productName,
  } = product;
  const neededDateFinal = moment(neededDate).format("YYYY-MM-DD HH:mm:ss");
  const returnDateFinal = moment(returnDate).format("YYYY-MM-DD HH:mm:ss");

  const body = {
    phone,
    hireNote,
    neededDate: neededDateFinal,
    returnDate: returnDateFinal,
    days,
    address,
    productId,
    productName,
  };

  axios
    .post(`${baseUrl}/orders/hire/add`, body, tokenConfig(getState))
    .then((res) => {
      toast.success("Hire Request successfully sent!");
      setTimeout(() => (window.location = "/hirelist"), 400);
    })
    .catch((error) => {
      toast.error("Hire request failed, try again later");
    });
};

export const fetchHireList = (pageNumber, filterObject) => (
  dispatch,
  getState
) => {
  axios
    .post(
      `${baseUrl}/orders/hirelist?page=` + pageNumber,
      { filterObject: filterObject },
      tokenConfig(getState)
    )
    .then((hireListResponse) => {
      dispatch({
        type: HIRE_LIST_LOADED,
        payload: hireListResponse.data,
      });
    });
};
