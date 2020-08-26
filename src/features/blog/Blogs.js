import * as React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";

import BlogItem from "./BlogItems";
import { getBlogs } from "../../redux/actions/blog/blogActions";
import AddBlog from "./AddBlog";

Modal.setAppElement("#root");
function Blogs({ getBlogs, blogState }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  React.useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="home">
      <button onClick={() => setModalOpen(!modalOpen)}>Add Blog</button>
      <Modal
        onRequestClose={() => setModalOpen(false)}
        isOpen={modalOpen}
        style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" } }}
      >
        <button onClick={() => setModalOpen(!modalOpen)}>close</button>
        <AddBlog />
      </Modal>

      {blogState.blogs.map((item, index) => {
        return (
          <BlogItem
            blog_id={item.id}
            title={item.title}
            content={item.content}
            key={index}
          />
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => ({
  blogState: state.blogReducer,
});

export default connect(mapStateToProps, { getBlogs })(Blogs);
