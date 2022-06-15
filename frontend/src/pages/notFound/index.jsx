import { Link } from "react-router-dom";
import styles from "./index.module.css";

export default function NotFound() {
  return (
    <h1>
      Vous vous êtes Perdu <br /> <Link to={"/"}>Retournez à l'accueil</Link>
    </h1>
  );
}
