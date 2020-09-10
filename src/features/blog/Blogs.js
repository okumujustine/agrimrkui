import * as React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";

import BlogItem from "./BlogItems";
import { getBlogs } from "../../redux/actions/blog/blogActions";
import AddBlog from "./AddBlog";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");
function Blogs({ getBlogs, blogState }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  React.useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="flex flex-col mt-6">
      <Link
        to="/addblog"
        className="font-bold flex-1 flex justify-center items-center w-1/12 rounded-full p-1 mb-2 text-agrisolidgreen bg-agribackgroung hover:text-agribackgroung hover:bg-agrisolidgreen border-agrisolidgreen border-2"
      >
        New Blog
      </Link>

      <div className="flex flex-row">
        <div className="w-2/12">search</div>
        <div className="w-9/12">
          {blogState.blogs.map((item, index) => {
            return (
              <BlogItem
                blog_id={item.id}
                title={item.title}
                content={item.content}
                user={item.user}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  blogState: state.blogReducer,
});

export default connect(mapStateToProps, { getBlogs })(Blogs);
