import axios from "axios";

import { GET_COMMENTS, COMMENTS_LOADING, ADD_COMMENTS_LOADING } from "../types";
import { toast } from "react-toastify";
import { baseUrl } from "../../../common/constants";
import { tokenConfig } from "../../../helperfuncs/getToken";

export const getBlogComments = (id) => (dispatch) => {
  dispatch({ type: COMMENTS_LOADING, payload: true });
  axios.get(`${baseUrl}/blog/comment?blog_id=${id}`).then((res) => {
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
      `${baseUrl}/blog/comment/add?blog_id=${id}`,
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
