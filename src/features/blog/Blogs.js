import * as React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import BlogItem from "./BlogItems";
import { getBlogs, getMoreBlogs } from "../../redux/actions/blog/blogActions";
import { Link } from "react-router-dom";

function Blogs({ getBlogs, blogState, getMoreBlogs }) {
  // window.location.reload();
  React.useEffect(() => {
    getBlogs(1, false);
  }, []);

  const fetchBlogs = () => {
    console.log("more load func");
    getMoreBlogs(blogState.page + 1, true);
  };

  return (
    <div className="flex flex-col mt-2">
      <Link
        to="/addblog"
        className="font-bold flex-1 flex justify-center items-center w-1/12 rounded-full p-1 mb-2 text-agrisolidgreen bg-agribackgroung hover:text-agribackgroung hover:bg-agrisolidgreen border-agrisolidgreen border-2"
      >
        New Blog
      </Link>

      <div className="flex flex-row justify-between">
        <div className="w-2/12">search</div>
        <div className="w-7/12">
          <InfiniteScroll
            dataLength={blogState.blogs.length}
            next={fetchBlogs}
            hasMore={blogState.notLast}
            loader={<h4>Loading...</h4>}
          >
            {blogState.blogs.map((item, index) => {
              return <BlogItem key={index} blog={item} />;
            })}
          </InfiniteScroll>
        </div>
        <div className="w-3/12">tags</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  blogState: state.blogReducer,
});

export default connect(mapStateToProps, { getBlogs, getMoreBlogs })(Blogs);
