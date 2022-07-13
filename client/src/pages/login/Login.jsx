import "./login.css";
import { useRef } from "react";

export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="loginInput" type="text" ref={userRef} placeholder="Enter your username..." />
        <label>Password</label>
        <input className="loginInput" type="password" ref={passwordRef} placeholder="Enter your password..." />
        <button className="loginButton">Login</button>
      </form>
        <button className="loginRegisterButton" type="submit">Register</button>
    </div>
  );
}
