import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import

import {
  GET_BLOGS,
  GET_BLOGS_LOADING,
  BLOGS_LAST_REACHED,
  GET_BLOGS_MORE,
} from "../types";
import { toast } from "react-toastify";
import { baseUrl } from "../../../common/constants";
import { tokenImageConfig, config } from "../../../helperfuncs/getToken";

export const getBlogs = (page, filterObject) => (dispatch) => {
  dispatch({ type: GET_BLOGS_LOADING, payload: true });

  const { title } = filterObject;

  axios.get(`${baseUrl}/blog?page=${page}&qtitle=${title}`).then((res) => {
    dispatch({
      type: GET_BLOGS,
      payload: { data: res.data, page },
    });
    dispatch({ type: GET_BLOGS_LOADING, payload: true });
  });
};

export const getMoreBlogs = (page, more, filterObject) => (
  dispatch,
  getState
) => {
  const { title } = filterObject;

  if (more) {
    page = getState().blogReducer.page + 1;
  }

  // stop hitting backend if last already
  if (getState().blogReducer.notLast === false) {
    return;
  }
  dispatch({ type: GET_BLOGS_LOADING, payload: true });
  axios.get(`${baseUrl}/blog?page=${page}&qtitle=${title}`).then((res) => {
    if (res.data.length === 0) {
      dispatch({
        type: BLOGS_LAST_REACHED,
      });

      return;
    }
    dispatch({
      type: GET_BLOGS_MORE,
      payload: { data: res.data, page, last: true },
    });
  });
};

export const addBlog = (blog) => (dispatch, getState) => {
  if (!getState().authReducer.isAuthenticated) {
    confirmAlert({
      title: "Not logged in",
      message: "Log in to add blog posts",
      buttons: [
        {
          label: "Go to login",
          onClick: () => (window.location = "/login"),
        },
        {
          label: "Cancel",
        },
      ],
    });
    return;
  }
  axios
    .post(`${baseUrl}/blog/add`, blog, tokenImageConfig(getState))
    .then((res) => {
      toast.success("Blog successfully added!");
    })
    .catch((error) => {
      toast.error("Failed to add blog, try again later");
    });
};

export const delBlog = (blog_id) => (dispatch) => {
  axios
    .post(`${baseUrl}/blog/delete?blog_id=` + blog_id, config)
    .then((res) => {
      dispatch(getBlogs());
      toast.success("Blog successfully deleted!");
    })
    .catch((err) => {
      toast.error("Failed to add blog, try agan later");
    });
};
