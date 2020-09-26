import React from "react";
// import quillEmoji from "quill-emoji";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

import { addBlog } from "../../redux/actions/blog/blogActions";
import { Link } from "react-router-dom";

function AddBlog({ addBlog }) {
  const [title, setTitle] = React.useState("");
  const [value, setValue] = React.useState("");
  const [banner, setBanner] = React.useState("");

  const handleEditorChange = () => {
    if (!title || !value) {
      toast.error("Provide title and content!!");
      return;
    }

    let formData = new FormData();
    try {
      formData.append("banner", banner, banner.name);
      formData.append("title", title);
      formData.append("content", value);
    } catch (e) {
      toast.error("select a banner please!!");
      return;
    }

    addBlog(formData);
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
        <div className="flex  flex-col w-7/12 mt-2">
          <div>
            <Link
              to="/blog"
              className="font-bold flex-1 flex justify-center items-center w-2/12 rounded-full p-1 mb-2 text-agrisolidgreen bg-agribackgroung hover:text-agribackgroung hover:bg-agrisolidgreen border-agrisolidgreen border-2"
            >
              <i className="fas fa-long-arrow-alt-left"></i> Blogs
            </Link>
          </div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w3-input w3-border w3-margin-bottom h-8 w-5/12 border-agrisolidgreen border-2 mb-2"
          />
          <label>Banner</label>
          <input type="file" onChange={(e) => setBanner(e.target.files[0])} />
        </div>
        <div>
          <label>Category</label>
        </div>
        <label>Content</label>
        <ReactQuill
          className="bg-white"
          placeholder="Type something here ..."
          modules={modules}
          formats={formats}
          theme="snow"
          value={value}
          onChange={setValue}
        />
      </div>
      <button
        className="bg-agrisolidgreen text-agribackgroung p-2 rounded-full mt-2 font-bold"
        onClick={handleEditorChange}
      >
        Post Blog <i className="fas fa-paper-plane"></i>
      </button>
    </React.Fragment>
  );
}

export default connect(null, { addBlog })(AddBlog);
