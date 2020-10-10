import axios from "axios";
import { tokenConfig } from "../auth/authActions";

import { GET_COMMENTS, COMMENTS_LOADING, ADD_COMMENTS_LOADING } from "../types";
import { toast } from "react-toastify";

export const getBlogComments = (id) => (dispatch) => {
  dispatch({ type: COMMENTS_LOADING, payload: true });
  axios.get(`http://127.0.0.1:5000/blog/comment?blog_id=${id}`).then((res) => {
    dispatch({
      type: GET_COMMENTS,
      payload: res.data,
    });
  });
};

export const addBlogComment = (commentData) => (dispatch, getState) => {
  const { id, comment } = commentData;
  dispatch({ type: ADD_COMMENTS_LOADING, payload: true });
  axios
    .post(
      `http://127.0.0.1:5000/blog/comment/add?blog_id=${id}`,
      { comment },
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(getBlogComments(id));
      dispatch({ type: ADD_COMMENTS_LOADING, payload: false });
      toast.success("Blog successfully deleted!");
    })
    .catch((error) => {
      dispatch({ type: ADD_COMMENTS_LOADING, payload: false });
      toast.error("Failed to add comment, try agan later");
    });
};
