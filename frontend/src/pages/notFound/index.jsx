import { Link } from "react-router-dom";
import styles from "./index.module.css";

export default function NotFound() {
  return (
    <>
    <div className={styles.container}>
    <h1>
      Vous vous êtes perdu <br /> <Link to={"/"}>Retournez à l'accueil</Link>
    </h1>
    </div>

    </>
    
  );
}
