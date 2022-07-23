import "./login.css";
import { useContext, useRef } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching} = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    console.log("login start");

    try {
      const res = await axios.post("https://khidki-api.herokuapp.com/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value
      })
      dispatch({type: "LOGIN_SUCCESS", payload: res.data });
      console.log("success");
    } catch(err) {
      dispatch({type: "LOGIN_FAILURE"});
      console.log(err);
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="loginInput" type="text" ref={userRef} placeholder="Enter your username..." />
        <label>Password</label>
        <input className="loginInput" type="password" ref={passwordRef} placeholder="Enter your password..." />
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
    </div>
  );
}
