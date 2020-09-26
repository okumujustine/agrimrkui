import { GET_PRODUCTS, GET_HIRE_PRODUCTS } from "../../actions/types";

const initialState = {
  products: [],
  hireProducts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: [...action.payload],
      };
    case GET_HIRE_PRODUCTS:
      return {
        ...state,
        hireProducts: [...action.payload],
      };
    default:
      return state;
  }
}
