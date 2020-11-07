import axios from "axios";

import { GET_PRODUCTS, GET_HIRE_PRODUCTS } from "../types";
import { baseUrl } from "../../../common/constants";

export const getProducts = (pageNumber, filterObject) => (dispatch) => {
  axios
    .post(`${baseUrl}/product/get?page=` + pageNumber, {
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
  axios.get(`${baseUrl}/product/hire/get?page=` + pageNumber).then((res) => {
    dispatch({
      type: GET_HIRE_PRODUCTS,
      payload: res.data,
    });
  });
};
