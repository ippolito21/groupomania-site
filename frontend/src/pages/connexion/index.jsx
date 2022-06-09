import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
export default function Connexion() {
  const navigation = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onsubmit = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/connexion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const data = await response.json();
       localStorage.setItem("userId", data.userId)
        navigation("/");
      }
    } catch (error) {
      alert("Quelque chose s'est mal passé");
    }
  };
  return (
    <>
      <h1 className={styles.title}>Page de connexion</h1>
      <form className={styles.form} onSubmit={handleSubmit(onsubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" {...register("email", { required: true })} />
          {errors.email && <p className={styles.error}>Email requis</p>}
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <p className={styles.error}>
              Mot de passe requis avec un mininum de 6 caracteres
            </p>
          )}
        </div>
        <button type="submit">Connexion</button>
      </form>
    </>
  );
}
// **  Gestion du formulaire on utilise la librairie react-hook-form afin de recuperer les données des inputs et aussi assurer une validation des données
// ** La fonction onsubmit a pour role d'envoyer les données issu du formulaire au backend grace à la fonction fetch
// ** Si tout est ok on affiche une boite de dialogue avec la reponse du backend et apres on fait une redirection vers la page d'acceuil