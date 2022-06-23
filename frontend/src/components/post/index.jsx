import { useContext } from "react";
import {Link} from 'react-router-dom'
import styles from "./index.module.css";
import { AuthenticationContext } from "../../context/authentication";
import { AiFillLike, AiFillDelete } from "react-icons/ai";
import {GrUpdate} from 'react-icons/gr'
export default function PostComponent(props) {
  const auth = useContext(AuthenticationContext);
  const adminStorage =JSON.parse( localStorage.getItem("admin"))
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.userInfo}>
          <img src={props.userImage} />
          <h2>{props.username}</h2>
        </div>
        <div className={styles.post}>
          <p className={styles.description}>{props.description}</p>
          <img src={props.imageUrl} alt={props.description} />
        </div>
      </div>
      <div className={styles.likes} data-id={props.postId}>
        <p>{props.likes}</p>
        <AiFillLike title="like" onClick={props.onClick} color="green" size={20} />
        {(props.userId._id === auth.userId  || adminStorage) && (
          <AiFillDelete title="supprimer" onClick={props.onDelete} color="tomato" size={20} />
        )}
         {(props.userId._id === auth.userId  || adminStorage) && (
          <Link to={`/update/${props.postId}`} ><GrUpdate title="mettre à jour"  color="dodgerblue" size={16}></GrUpdate></Link>
        )}
       
      </div>
    </div>
  );
}
