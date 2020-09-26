import * as React from "react";
import { useParams, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import {
  getBlogComments,
  addBlogComment,
} from "../../redux/actions/comments/commentsAction";

function BlogComment({
  location,
  getBlogComments,
  addBlogComment,
  commentsState,
}) {
  let { id } = useParams();
  const { state } = location;

  const [comment, setComment] = React.useState("");

  React.useEffect(() => {
    getBlogComments(id);
  }, []);

  React.useEffect(() => {
    setComment("");
  }, [commentsState.comments]);

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const toComment = React.useRef(null);
  const scrollToComment = () => scrollToRef(toComment);

  if (!id || !state) {
    // toast.error("Method not allowed");
    return <Redirect to="/blog" />;
  }

  const addComment = () => {
    addBlogComment({ id, comment });
  };

  return (
    <div className="min-h-full mb-5">
      {commentsState.loading && <div>comments loading ....</div>}
      <div>
        <div>
          <Link
            to="/blog"
            className="font-bold flex-1 justify-center items-center rounded-full py-2 px-4 mb-3 text-agrisolidgreen bg-agribackgroung hover:text-agribackgroung hover:bg-agrisolidgreen border-agrisolidgreen border-2"
          >
            <i className="fas fa-long-arrow-alt-left"></i> Blogs
          </Link>
        </div>
        <button
          onClick={scrollToComment}
          className="float-right fixed right-0 mr-3 border-agrisolidgreen border-2 rounded-full p-2 focus:outline-none font-bold text-agrisolidgreen bg-white"
        >
          click to comment
        </button>
      </div>
      <h1 className="font-bold text-xl text-agrisolidgreen capitalize underline pb-2 mt-4">
        {state.title}
      </h1>
      <small className="pb-4 text-gray-500">{`${moment(state.date).fromNow(
        true
      )} ago`}</small>
      <div dangerouslySetInnerHTML={{ __html: state.content }}></div>
      <br />
      {commentsState.comments.map((comment, index) => (
        <div key={index}>
          <div className="p-3 bg-white mt-2 rounded-lg inline-block min-w-0">
            <small>{comment.user.name}</small>
            <p>{comment.comment}</p>
            <small className="text-gray-500">{`${moment(
              comment.date_created
            ).fromNow(true)} ago`}</small>
          </div>
        </div>
      ))}

      <div className="flex flex-col mt-6">
        <label className="font-bold">Comment</label>
        <textarea
          ref={toComment}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="type comment here .."
          className=" resize-none border rounded w-6/12 p-5 focus:outline-none"
        ></textarea>
        <button
          onClick={addComment}
          className="mt-2 font-bold w-1/12 bg-agrisolidgreen text-white p-2 rounded-full focus:outline-none"
        >
          Comment
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  commentsState: state.commentsReducer,
});
export default connect(mapStateToProps, { getBlogComments, addBlogComment })(
  BlogComment
);
