import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  const PF = "https://khidki-api.herokuapp.com/images/";
  console.log(post.photo);
  return (
    <div className="post">
      {
        <img
          className="postImg"
          src={(post.photo && PF+post.photo) || `https://data.whicdn.com/images/339065287/original.jpg`}
          alt=""
        />
      }
      {console.log(PF+post.photo)}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map(c => (
            <span className="postCat" key={c._id}>{c.name}</span>
          ))}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
