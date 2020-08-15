import axios from "axios";

import { GET_PRODUCTS } from "../types";

export const getProducts = () => (dispatch) => {
  axios.get("http://localhost:4030/products").then((res) => {
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  });
};
