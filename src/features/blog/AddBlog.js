import React from "react";
// import quillEmoji from "quill-emoji";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { addBlog } from "../../redux/actions/blog/blogActions";

function AddBlog({ addBlog }) {
  let [title, setTitle] = React.useState("");
  const [value, setValue] = React.useState("");

  const handleEditorChange = () => {
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
      <div style={{ height: 520 }}>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <label htmlFor="title" style={{ paddingLeft: 7 }}>
            Title
          </label>
          <input
            style={{ width: "95%", height: 30 }}
            type="text"
            name={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w3-input w3-border w3-margin-bottom"
          />
        </div>
        <ReactQuill
          style={{ height: 430 }}
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
