import styles from './index.module.css'
import {AiFillLike} from 'react-icons/ai'
export default function PostComponent(props){
    return(
        <>
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
                <AiFillLike onClick={props.onClick} color="green" size={20} />
        </div>
            </>

    )
}