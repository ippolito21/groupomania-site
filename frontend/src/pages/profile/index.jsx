import { useEffect, useState } from "react";
import { getItemFromLocalStorage } from "../../libs/localstorage";
import styles from "./index.module.css";

const url = "http://localhost:8080/api/auth/profile";

export default function Profile() {
  const [profile, setProfile] = useState(false);

  const onClick = () => {
    const confirm = window.confirm("Etes-vous sure de vouloir supprimer votre compte")
    if(confirm){
        // ** Logique de suppresssion
    }
  }
  useEffect(() => {
    const { userId } = getItemFromLocalStorage("authentication");
    const getData = async () => {
      const response = await fetch(`${url}/${userId}`);
      const data = await response.json();
      setProfile(data);
    };
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Page de profil</h1>
      {profile && (
        <div className={styles.card}>
          <img src={profile.imageUrl} alt="de profil" />
          <h2>Nom d'utilisateur <span>{profile.username}</span></h2>
          <div className={styles.info}>
            <p>Email : {profile.email}</p>
            <p>
              Compte crée le <span>{profile.date.split("T")[0]}</span> à
             <span> {profile.date.split("T")[1].split(".")[0]}</span>
            </p>
          </div>
          <button onClick={onClick} className={styles.danger}>Supprimer le compte</button>
        </div>
      )}
    </div>
  );
}
