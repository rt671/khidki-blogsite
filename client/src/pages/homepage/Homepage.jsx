import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./homepage.css";
import axios from "axios";
import Sidebar from"../../components/sidebar/Sidebar";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(() => {
    const fetchPosts = async() => {
      const res = await axios.get("/posts"+search);
      console.log(res);
      setPosts(res.data);
    }
    fetchPosts();
  }, [search])
  
  // const location = useLocation();
  // console.log(location);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts}/>
        <Sidebar />
      </div>
    </>
  );
}
