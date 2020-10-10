import * as React from "react";
import { connect } from "react-redux";
import moment from "moment";

import { Link } from "react-router-dom";
import { imageUrl } from "../../sdk/serverConsts";

function BlogItems({ title, blog }) {
  return (
    <div className="flex flex-row bg-white mb-2 m-12 mt-0 p-2">
      <Link
        to={{
          pathname: `/comment/${blog.id}`,
          state: {
            title: blog.title,
            content: blog.content,
            date: blog.date_created,
          },
        }}
      >
        <div
          className="bg-cover h-32 w-32"
          style={{ backgroundImage: `url(${imageUrl}${blog.banner})` }}
        >
          <div className=" bg-agrisolidgreen bg-opacity-50 pl-3 pr-3">
            <small className="text-white">verified</small>
          </div>
        </div>
      </Link>
      <div className="flex flex-col pl-3 justify-center flex-1">
        <Link
          to={{
            pathname: `/comment/${blog.id}`,
            state: {
              title: blog.title,
              content: blog.content,
              date: blog.date_created,
            },
          }}
        >
          <h1 className="font-bold text-xl text-agrisolidgreen capitalize truncate">
            {blog.title}
          </h1>
        </Link>
        <div className="text-beautifulgray">
          <small>
            <i className="fas fa-user-circle"></i> {blog.user.name}
          </small>
        </div>
        <div className="text-beautifulgray">
          <small>
            <i className="fas fa-clock"></i>{" "}
            {`${moment(blog.date_created).fromNow(true)} ago`}
          </small>
        </div>
        <div className="flex flex-row justify-between pr-20 pt-3">
          <Link
            to={{
              pathname: `/comment/${blog.id}`,
              state: {
                tite: blog.title,
                content: blog.content,
                date: blog.date_created,
              },
            }}
          >
            <i className="fas fa-comment"></i> {blog.comment_count} comments
          </Link>
          <Link
            to={{
              pathname: `/comment/${blog.id}`,
              state: {
                title: blog.title,
                content: blog.content,
                date: blog.date_created,
              },
            }}
          >
            <i className="fas fa-eye"></i> {blog.seen_count} views
          </Link>
        </div>
      </div>
    </div>
  );
}

export default connect(null, null)(BlogItems);
