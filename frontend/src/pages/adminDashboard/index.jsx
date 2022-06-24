import { useState, useEffect, useContext, useRef } from "react";
import PostComponent from "../../components/post";
import styles from "./index.module.css";
import Spinner from "react-bootstrap/Spinner";
import { AuthenticationContext } from "../../context/authentication";

export default function AdminDashboard() {
    const countRef = useRef()
  const [posts, setPosts] = useState(false);
  const [loading, setLoading] = useState(true);
  const adminAuth = useContext(AuthenticationContext);
  const handleDelete = async (e) => {
    const postElement = e.target.closest("div").parentElement;
    const id = e.target.closest("div").dataset.id;
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/post/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${adminAuth.token}`
          },
          body: JSON.stringify({ userId: adminAuth.userId }),
        }
      );
      if (response.ok) {
        postElement.remove();
        countRef.current.innerText -=1
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("http://localhost:8080/api/posts/all", {
        method : "GET",
        headers : {
          Authorization : `Bearer ${adminAuth.token}`
        }
      });
      if (response.ok) {
        setLoading(false);
        setPosts(await response.json());
      }
    };
    getPosts();
  }, []);
  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      {loading && (
        <div className={styles.loader} style={{ margin: "auto" }}>
          <Spinner animation="border" variant="info" />
        </div>
      )}
      {posts && posts.length === 0 && (
        <h2>Aucune publication pour le moment</h2>
      )}
      {posts && posts.length > 0 && (
        <h2>
          Nombre de {posts.length > 1 ? "postes" : "poste"} <span ref={countRef}>{posts.length}</span>
        </h2>
      )}
      {posts &&
        posts.map((post) => (
          <PostComponent
            key={post._id}
            username={post.userId.username}
            description={post.description}
            imageUrl={post.imageUrl}
            likes={post.likes}
            userImage={post.userId.imageUrl}
            postId={post._id}
            onDelete={handleDelete}
            userId={post.userId}
            
          />
        ))}
    </div>
  );
}
