import axios from "axios";
import { config } from "../auth/authActions";

import { GET_BLOGS } from "../types";
import { toast } from "react-toastify";

export const getBlogs = () => (dispatch) => {
  axios.get("http://127.0.0.1:5000/blog").then((res) => {
    dispatch({
      type: GET_BLOGS,
      payload: res.data,
    });
  });
};

export const addBlog = (blog) => (dispatch) => {
  console.log(blog);
  axios.post("http://127.0.0.1:5000/blog/add", blog, config).then((res) => {
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
