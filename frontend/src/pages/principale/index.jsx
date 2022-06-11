import { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner'
import PostComponent from "../../components/post";
import styles from "./index.module.css";

export default function Home() {
  const [posts, setPosts] = useState(false);
  const [loading, setLoading] = useState(true)

  console.log(posts);
  const getPosts = async () => {
    const response = await fetch("http://localhost:8080/api/posts/all");
    if (response.ok) {
        setLoading(false)
      setPosts(await response.json());
    }
  };
  useEffect(() => {
   getPosts()
  }, []);

  return (
    <div className={styles.container}>
        {loading && 
            <div style={{margin : "auto"}}>
                <Spinner animation="border"  variant="info"/>
            </div>
        }

        {posts && posts.length === 0 &&
            <h1 style={{textAlign : "center"}}>Aucune publication pour le moment</h1>
        }
      {posts &&
        posts.map((post) => (
          <PostComponent
            key = {post._id}
            username={post.userId.username}
            description={post.description}
            imageUrl={post.imageUrl}
            likes = {post.likes}
            userImage = {post.userId.imageUrl}
          />
        ))}
    </div>
  );
}
