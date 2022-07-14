import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [success, setSuccess] = useState(false);
  const PF = "http://localhost:5000/images/";

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" })
    const updatedUser = {
      userId: user._id,
      username, email, password
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) { }
    }

    try {
      const res = await axios.put("/user/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" })

    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleUserUpdate}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <label htmlFor="fileInput">
              <img
                src={PF+user.profilePic || `https://t3.ftcdn.net/jpg/03/64/62/36/360_F_364623623_ERzQYfO4HHHyawYkJ16tREsizLyvcaeg.jpg`}
                alt=""
              />
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" value={username} name="name" onChange={(e) => setUsername(e.target.value)} />

          <label>Email</label>
          <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && <span className="successmsg">User updated successfully...</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
