import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./homepage.css";
import axios from "axios";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(() => {
    const fetchPosts = async() => {
      const res = await axios.get("https://khidki-api.herokuapp.com/api/posts"+search);
      console.log(res);
      setPosts(res.data);
      console.log("Successful");
    }
    fetchPosts();
  }, [search])
  
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts}/>
      </div>
    </>
  );
}
