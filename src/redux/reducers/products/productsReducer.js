import { GET_PRODUCTS, GET_HIRE_PRODUCTS } from "../../actions/types";

const initialState = {
  products: [],
  hireProducts: [],
  hireCurrentPage: 0,
  hirePerPage: 0,
  hireTotalPage: 0,
  prodCurrentPage: 0,
  prodPerPage: 0,
  prodTotalPage: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        prodCurrentPage: action.payload.current_page,
        prodPerPage: action.payload.per_page,
        prodTotalPage: action.payload.total,
      };
    case GET_HIRE_PRODUCTS:
      return {
        ...state,
        hireProducts: action.payload.products,
        hireCurrentPage: action.payload.current_page,
        hirePerPage: action.payload.per_page,
        hireTotalPage: action.payload.total,
      };
    default:
      return state;
  }
}
