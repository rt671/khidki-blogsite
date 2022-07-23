import { useState } from "react"
import "./register.css"
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError(false);
    try{
    const res = await axios.post("https://khidki-api.herokuapp.com/api/auth/register", {
      username, 
      email, 
      password
    });
    res.data && window.location.replace("https://khidki-api.herokuapp.com/api/login");
  } catch(err){
    setError(true);
  }
  }
    return (
        <div className="register">
          <span className="registerTitle">Register</span>
          <form className="registerForm"  onSubmit={handleSubmit}>
            <label>Username</label>
            <input className="registerInput" type="text" required placeholder="Enter your username..." 
            onChange={e=> setUsername(e.target.value)} />
            <label>Email</label>
            <input className="registerInput" type="email" required placeholder="Enter your email..."  
            onChange={e=>setEmail(e.target.value)}/>
            <label>Password</label>
            <input className="registerInput" type="password" required minLength="5" placeholder="Enter your password..." 
            onChange={e=>setPassword(e.target.value)}/>
            <button className="registerButton" type="submit">Register</button>
          </form>
          {error && <span style={{color: "red", marginTop:'10px'}}>Something went Wrong</span>}
    </div>
    )
}
