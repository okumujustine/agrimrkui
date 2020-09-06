import axios from "axios";

import { GET_PRODUCTS } from "../types";

export const getProducts = () => (dispatch) => {
  axios.get("http://127.0.0.1:5000/product/get?page=1").then((res) => {
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  });
};
