import axios from "axios";

import { GET_PRODUCTS, GET_HIRE_PRODUCTS } from "../types";

export const getProducts = () => (dispatch) => {
  axios.get("http://127.0.0.1:5000/product/get?page=1").then((res) => {
    if (res.data.length > 0) {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    }
  });
};

export const getHireProducts = () => (dispatch) => {
  axios.get("http://127.0.0.1:5000/product/hire/get?page=1").then((res) => {
    if (res.data.length > 0) {
      dispatch({
        type: GET_HIRE_PRODUCTS,
        payload: res.data,
      });
    }
  });
};
