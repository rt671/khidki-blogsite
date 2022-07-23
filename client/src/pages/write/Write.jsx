import { useContext } from "react";
import "./write.css";
import { Context } from "../../context/Context";
import { useState } from "react";
import axios from "axios"

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const {user} = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("https://khidki-api.herokuapp.com/api/upload", data);
      } catch (err) { }
    }
    try {
      console.log("Posting the post", newPost);
      const res = await axios.post("https://khidki-api.herokuapp.com/api/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) { console.log("Problem occured");}
  };

  return (
    <div className="write">
      {file && (
        <img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
          <i className="writeIcon fa-solid fa-camera"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story, pour your thoughts..."
            type="text"
            autoFocus={true}
            onChange={e => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}
