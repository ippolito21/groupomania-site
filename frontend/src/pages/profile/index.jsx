import { useEffect, useState, useContext } from "react";
import {useNavigate} from "react-router-dom"
import {AuthenticationContext} from '../../context/authentication'
import { getItemFromLocalStorage } from "../../libs/localstorage";
import styles from "./index.module.css";

const url = "http://localhost:8080/api/auth/profile";

export default function Profile() {
  const navigate = useNavigate()
  const auth = useContext(AuthenticationContext)
  const [profile, setProfile] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm("Etes-vous sure de vouloir supprimer votre compte")
    if(confirm){
      const response = await fetch(`http://localhost:8080/api/auth/delete/${auth.userId}`, {
        method : "DELETE",
        headers : {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${auth.token}`
        },
        body : JSON.stringify({userId : auth.userId})
      });
      if(response.ok){
        auth.logout()
        navigate('/inscription')
      }
    }
  }
  useEffect(() => {
    const { userId } = getItemFromLocalStorage("authentication");
    const getData = async () => {
      const response = await fetch(`${url}/${userId}`, {
        method : "GET",
        headers : {
          Authorization : `Bearer ${auth.token}`
        }
      });
      const data = await response.json();
      setProfile(data);
    };
    getData();
  }, []);

  return (
    <div className={styles.container}>
      {profile && (
        <div className={styles.card}>
          <img src={profile.imageUrl} alt="de profil" />
          <h2><span>{profile.username}</span></h2>
          <div className={styles.info}>
            <p>{profile.email}</p>
            <p>
              Compte crée le <span>{profile.date.split("T")[0]}</span> à
             <span> {profile.date.split("T")[1].split(".")[0]}</span>
            </p>
          </div>
          <button onClick={handleDelete} className={styles.danger}>Supprimer le compte</button>
        </div>
      )}
    </div>
  );
}

/*l'utilisateur est déconnecté grace à la méthode logout défini au niveau du contexte et va supprimer le localstorage*/