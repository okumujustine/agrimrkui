import { HIRE_LIST_LOADED } from "../../actions/types";

const initialState = {
  hireOrderLoading: null,
  hireList: [],
  hireListCurrentPage: 0,
  hireListPerPage: 0,
  hireListTotalPage: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HIRE_LIST_LOADED:
      return {
        ...state,
        hireOrderLoading: false,
        hireList: action.payload.hire_requests_products,
        hireListCurrentPage: action.payload.current_page,
        hireListPerPage: action.payload.per_page,
        hireListTotalPage: action.payload.total,
      };
    default:
      return state;
  }
}
