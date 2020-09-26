import { GET_COMMENTS, COMMENTS_LOADING } from "../../actions/types";

const initialState = {
  comments: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: [...action.payload],
        loading: false,
      };
    default:
      return state;
  }
};
