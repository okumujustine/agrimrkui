import { GET_BLOGS } from "../../actions/types";

const initialState = {
  blogs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
    default:
      return state;
  }
};
