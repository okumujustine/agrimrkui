import * as React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BlogComment({ location }) {
  let { id } = useParams();
  const { state } = location;
  const [comments, setComments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:5000/blog/comment?blog_id=${id}`)
      .then((res) => {
        setLoading(false);
        setComments([...res.data]);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <div className="home">
      <h2>{state.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: state.content }}></div>
      <br />
      <p>blog BlogComment {id}</p>
      {comments.map(({ comment, user }, index) => (
        <div key={index}>
          <p>
            {comment} by {user.name}
          </p>
        </div>
      ))}
    </div>
  );
}
