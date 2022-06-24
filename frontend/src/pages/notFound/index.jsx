import { Link } from "react-router-dom";
import { getItemFromLocalStorage } from "../../libs/localstorage";
import styles from "./index.module.css";

export default function NotFound() {
  const adminStorage = getItemFromLocalStorage("admin");
  return (
    <>
      <div className={styles.container}>
        <h1>
          Vous vous êtes perdu <br />{" "}
          <Link to={!adminStorage ? "/" : "/admin/dashboard"}>
            {!adminStorage ? "Retournez à l'accueil" : "Retournez au dashboard"}
          </Link>
        </h1>
      </div>
    </>
  );
}
