import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import {GrUserAdmin} from "react-icons/gr"
import { AuthenticationContext } from "../../context/authentication";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/icon-left-font-removebg-preview.png";

import styles from "./index.module.css";
export default function Navigation() {
  const navigate = useNavigate();
  const auth = useContext(AuthenticationContext);
  const adminStorage = JSON.parse(localStorage.getItem('admin'))
  const logout = () => {
    const result = window.confirm("Se déconnecter ?");
    if (result) {
      auth.logout();
      navigate("/connexion");
      
    }
  };
  return (
    <nav className={styles.navigation}>
      <Link to={auth.isLoggedIn && !adminStorage ? "/" : "/admin/dashboard"}>
        <img src={logo} alt="Logo Groupomania" />
      </Link>
      <ul>
        {!auth.isLoggedIn && (
          <li>
            <Link to="/inscription">Inscription</Link>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li>
            <Link to="/connexion">Connexion</Link>
          </li>
        )}
         {!auth.isLoggedIn && (
          <li>
            <Link to="/admin/connexion"><GrUserAdmin/> </Link>
          </li>
        )}
        {auth.isLoggedIn && !adminStorage && (
          <li>
            <Link to="/ajouter">Publication</Link>
          </li>
        )}
        {auth.isLoggedIn && ! adminStorage && (
          <li>
            <Link to="/profile">Profil</Link>
          </li>
        )}
        {auth.isLoggedIn && <FiLogOut title="Deconnexion" onClick={logout} id={styles.deconnexion} />}
      </ul>
    </nav>
  );
}
