import {
  GET_BLOGS,
  GET_BLOGS_LOADING,
  BLOGS_LAST_REACHED,
} from "../../actions/types";

const initialState = {
  blogs: [],
  page: 1,
  loading: false,
  notLast: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: [...state.blogs, ...action.payload.data],
        loading: false,
        page: action.payload.page,
      };
    case GET_BLOGS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case BLOGS_LAST_REACHED:
      return {
        ...state,
        notLast: false,
      };
    default:
      return state;
  }
};
