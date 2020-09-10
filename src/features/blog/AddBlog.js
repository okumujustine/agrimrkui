import React from "react";
// import quillEmoji from "quill-emoji";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

import { addBlog } from "../../redux/actions/blog/blogActions";
import { Link } from "react-router-dom";

function AddBlog({ addBlog }) {
  let [title, setTitle] = React.useState("");
  const [value, setValue] = React.useState("");

  const handleEditorChange = () => {
    if (!title || !value) {
      console.log("no way");
      toast.error("Provide title and content!!");
      return;
    }

    const blogContent = {
      title,
      content: value,
    };
    addBlog(blogContent);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
      ["video"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <React.Fragment>
      <div className="z-0">
        <div className="flex  flex-col w-7/12 mt-6">
          <div>
            <Link
              to="/blog"
              className="font-bold flex-1 flex justify-center items-center w-2/12 rounded-full p-1 mb-2 text-agrisolidgreen bg-agribackgroung hover:text-agribackgroung hover:bg-agrisolidgreen border-agrisolidgreen border-2"
            >
              <i class="fas fa-long-arrow-alt-left"></i> Blogs
            </Link>
          </div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w3-input w3-border w3-margin-bottom h-8 w-5/12 border-agrisolidgreen border-2 mb-2"
          />
        </div>
        <label>Content</label>
        <ReactQuill
          modules={modules}
          formats={formats}
          theme="snow"
          value={value}
          onChange={setValue}
        />
      </div>
      <button onClick={handleEditorChange}>Post</button>
    </React.Fragment>
  );
}

export default connect(null, { addBlog })(AddBlog);
