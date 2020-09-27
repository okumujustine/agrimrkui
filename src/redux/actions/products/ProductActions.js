import axios from "axios";

import { GET_PRODUCTS, GET_HIRE_PRODUCTS } from "../types";

export const getProducts = (pageNumber, filterObject) => (dispatch) => {
  axios
    .post("http://127.0.0.1:5000/product/get?page=" + pageNumber, {
      filterObject: filterObject,
    })
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    });
};

export const getHireProducts = (pageNumber) => (dispatch) => {
  axios
    .get("http://127.0.0.1:5000/product/hire/get?page=" + pageNumber)
    .then((res) => {
      dispatch({
        type: GET_HIRE_PRODUCTS,
        payload: res.data,
      });
    });
};
