import * as React from "react";
import { connect } from "react-redux";

import { delBlog } from "../../redux/actions/blog/blogActions";
import { Link } from "react-router-dom";

function BlogItems({ title, content, blog_id, user, delBlog }) {
  const deleteBlog = (blogId) => {
    delBlog(blogId);
  };
  return (
    <div
      style={{
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
        backgroundColor: "#ffffff",
        margin: "3rem",
        padding: 30,
      }}
    >
      <h5>Author: {user.name}</h5>
      <hr />
      <br />
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
        <Link
          to={{
            pathname: `/comment/${blog_id}`,
            state: {
              title,
              content,
            },
          }}
        >
          comment
        </Link>
      </footer>
    </div>
  );
}

export default connect(null, { delBlog })(BlogItems);
