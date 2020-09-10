import axios from "axios";
import { config, tokenConfig } from "../auth/authActions";

import { GET_BLOGS, GET_BLOGS_LOADING, BLOGS_LAST_REACHED } from "../types";
import { toast } from "react-toastify";

export const getBlogs = (page, more) => (dispatch, getState) => {
  if (more) {
    page = getState().blogReducer.page + 1;
  }

  // stop hitting backend if last already
  if (getState().blogReducer.notLast === false) {
    return;
  }
  dispatch({ type: GET_BLOGS_LOADING });
  axios.get(`http://127.0.0.1:5000/blog?page=${page}`).then((res) => {
    if (res.data.length == 0) {
      console.log("last reached");
      dispatch({
        type: BLOGS_LAST_REACHED,
      });

      return;
    }
    dispatch({
      type: GET_BLOGS,
      payload: { data: res.data, page, last: true },
    });
  });
};

export const addBlog = (blog) => (dispatch, getState) => {
  console.log(blog);
  axios
    .post("http://127.0.0.1:5000/blog/add", blog, tokenConfig(getState))
    .then((res) => {
      dispatch(getBlogs());
      toast.success("Blog successfully added!");
    });
};

export const delBlog = (blog_id) => (dispatch) => {
  console.log(blog_id);

  axios
    .post("http://127.0.0.1:5000/blog/delete?blog_id=" + blog_id, config)
    .then((res) => {
      dispatch(getBlogs());
      toast.success("Blog successfully deleted!");
    });
};
