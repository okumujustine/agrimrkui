import * as React from "react";
import { connect } from "react-redux";

import { delBlog } from "../../redux/actions/blog/blogActions";
import { Link } from "react-router-dom";

function BlogItems({ title, content, blog_id, user, delBlog }) {
  const deleteBlog = (blogId) => {
    delBlog(blogId);
  };
  return (
    <div className="w-full flex flex-col justify-center bg-white mb-2 p-4 m-12 mt-0">
      <h5>Author: {user.name}</h5>
      <hr />
      <br />
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <footer className="flex justify-around">
        <button>Like</button>
        <button>repost</button>
        <button onClick={() => deleteBlog(blog_id)}>delete</button>
        <Link
          to={{
            pathname: `/comment/${blog_id}`,
            state: {
              title,
              content,
            },
          }}
        ></Link>
      </footer>
    </div>
  );
}

export default connect(null, { delBlog })(BlogItems);
