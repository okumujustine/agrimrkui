import * as React from "react";
import { connect } from "react-redux";

import { delBlog } from "../../redux/actions/blog/blogActions";

function BlogItems({ title, content, blog_id, delBlog }) {
  const deleteBlog = (blogId) => {
    delBlog(blogId);
  };
  return (
    <div
      style={{
        marginBottom: 40,
        backgroundColor: "#ffffff",
        margin: "3rem",
        padding: 30,
      }}
    >
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <footer>
        <button style={{ marginRight: "2rem" }}>Like</button>
        <button style={{ marginRight: "2rem" }}>repost</button>
        <button
          onClick={() => deleteBlog(blog_id)}
          style={{ marginRight: "2rem" }}
        >
          delete
        </button>
        <button>comment</button>
      </footer>
    </div>
  );
}

export default connect(null, { delBlog })(BlogItems);
