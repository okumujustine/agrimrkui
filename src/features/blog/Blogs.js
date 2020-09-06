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
    <div>
      blog
      {/* <Modal
        onRequestClose={() => setModalOpen(false)}
        isOpen={modalOpen}
        style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" } }}
      >
        <button onClick={() => setModalOpen(!modalOpen)}>close</button>
        <AddBlog />
      </Modal>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ width: "20%", position: "fixed" }}>seaech</div>
        <div
          style={{
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            right: 0,
          }}
        >
          <button onClick={() => setModalOpen(!modalOpen)}>Add Blog</button>
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
      </div> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  blogState: state.blogReducer,
});

export default connect(mapStateToProps, { getBlogs })(Blogs);
