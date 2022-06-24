import { useState, useEffect, useContext } from "react";
import {AuthenticationContext} from '../../context/authentication'
import Spinner from 'react-bootstrap/Spinner'
import PostComponent from "../../components/post";
import styles from "./index.module.css";

export default function Home() {
  const auth = useContext(AuthenticationContext)
  const [posts, setPosts] = useState(false);
  const [loading, setLoading] = useState(true)

  const handleLikes = async (e) => {
    console.log(auth.token)
    const id = e.target.closest("div").dataset.id
    const response = await fetch(`http://localhost:8080/api/posts/one/${id}`);
    const post = await response.json()
    if(!post.usersLiked.includes(auth.userId)){
      const response = await fetch(`http://localhost:8080/api/posts/${id}/like`, {
        method : "POST",
        headers : {
          Authorization : "Bearer " + auth.token,
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({like : 1, userId : auth.userId})
      })
      if(response.ok){
        //alert("Like pris en compte")
        const likeCount = e.target.closest('div').firstChild
        const likeCountValue = parseInt(likeCount.textContent)
        likeCount.textContent = likeCountValue + 1
      }
    }
    else if(post.usersLiked.includes(auth.userId)){
      const response = await fetch(`http://localhost:8080/api/posts/${id}/like`, {
        method : "post",
        headers : {
          Authorization : "Bearer " + auth.token,
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({like : 0, userId : auth.userId})
      })
      if(response.ok){
        //alert("annulation du like prise en compte")
        const likeCount = e.target.closest('div').firstChild
        const likeCountValue = parseInt(likeCount.textContent)
        likeCount.textContent = likeCountValue - 1
      }
    }
  }

  const handleDelete =  async (e) => {
    const postId = e.target.closest('div').dataset.id
    const userId = auth.userId
    const postElement =  e.target.closest('div').parentElement
    
    try {
     const response =  await fetch(`http://localhost:8080/api/posts/delete/${postId}`, {
        method : "DELETE",
        headers : {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${auth.token}`
        },
        body : JSON.stringify({userId : userId})
      })
      if(response.ok){
       postElement.remove()
      }
    } catch (error) {}
    

  }
  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("http://localhost:8080/api/posts/all", {
        method : "GET",
        headers : {
          Authorization : `Bearer ${auth.token}`
        }
      });
      if (response.ok) {
          setLoading(false)
        setPosts(await response.json());
      }
    };
   getPosts()
  }, []);
//loader spinner
  return (
    <div className={styles.container}>
        {loading && 
            <div className={styles.loader} style={{margin : "auto"}}>
                <Spinner animation="border"  variant="info" />
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
            onClick = {handleLikes}
            postId = {post._id}
            onDelete = {handleDelete}
            userId = {post.userId}
          />
        ))}
    </div>
  );
}


// ** handleLikes
/*
  Gestion des likes et des annulations de like
   1 -recupere le post à liker depuis le back
   2 - on verfie au niveau du tableau des usersLiked si l'utilisateur est inclus.
   2.1 - s'il nest pas inclus c'est que l'utilisateur tente de liker. on envoie au back l'id de l'utilisateur ainsi la valeur 1 au niveau du like
   2.2 - s'il est  inclus c'est que l'utilisateur tente de retirer son  like. on envoie au back l'id de l'utilisateur ainsi la valeur 0 au niveau du like
   3 On fait une mise à jour de l'affichage du nombre de likes, soit en ajoutant 1, soit en retirant 1

*/

// *** useEffect
/* 
  on recupere la liste et on les passe au state posts via la fonctions setposts

*/