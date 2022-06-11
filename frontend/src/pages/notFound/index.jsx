import { Link } from "react-router-dom";
import styles from "./index.module.css";

export default function NotFound() {
  return (
    <h1>
      Vous vous etes Perdu <br /> <Link to={"/"}>Retourner à l'acceuil</Link>
    </h1>
  );
}
