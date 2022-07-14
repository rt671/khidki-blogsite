import { Link } from "react-router-dom";
import "./topbar.css";
import { Context } from "../../context/Context";
import { useContext } from "react";

export default function Topbar() {
  const {user, dispatch} = useContext(Context);
  const PF = "http://localhost:5000/images/";


  const handleLogout = () => {
    console.log("Dispatched");
    dispatch({type:"LOGOUT"});
  }

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fa-brands fa-linkedin"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>

      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem"><Link className="link" to="/">HOME </Link></li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem"><Link className="link" to="/write">WRITE</Link></li>
        </ul>
      </div>

      <div className="topRight">
        <input className="topSearchIcon" type="search" placeholder="Search"></input>
        {user ? (
          <><Link className="link" to="/settings">
            <img
              className="topImg"
              src={PF+user.profilePic || `https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png`}
              alt="" />
          </Link>
          <p className="topListItem" onClick={handleLogout}>LOGOUT</p></>
        ) : (
            <ul className="topList">
              <li className="topListItem">
                <Link className="link" to="/login">
                  LOGIN
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/register">
                  REGISTER
                </Link>
              </li>
            </ul>
        )}
        
      </div>
    </div>
  );
}
