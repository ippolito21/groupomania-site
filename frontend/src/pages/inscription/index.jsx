import {useEffect, useState} from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
export default function Inscription() {
  const navigation = useNavigate();
  const [currentImage, setCurrentImage] = useState();
  const [previewSrc, setPreviewSrc] = useState();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onsubmit = async (data) => {
      const formData =  new FormData()
      formData.append("username", data.username)
      formData.append("email", data.email)
      formData.append("password", data.password)
      formData.append("image", data.image[0])
    

    try {

      const response = await fetch(
        "http://localhost:8080/api/auth/inscription",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        navigation("/connexion");
      }
    } catch (error) {
      alert("Quelque chose s'est mal passé");
    }
  };

  function onChangeImage(e) {
     
    if (e.target.files) {
      const currentImage = e.target.files[0];
      setCurrentImage(currentImage);
    }
    else {
        return
    }
  }
  useEffect(() => {
    if (currentImage) {
      const imageReader = new FileReader();
      imageReader.onload = () => {
        setPreviewSrc(imageReader.result);
      };
      imageReader.readAsDataURL(currentImage);
    } else {
      return;
    }
  }, [currentImage]);
  return (
    <>
    <div className={styles.blocForm}>
      <h1 className={styles.title}>Page d'inscription</h1>
      <form className={styles.form} onSubmit={handleSubmit(onsubmit)}>
        <div>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input type="text" {...register("username", { required: true })} placeholder="françoise"/>
          {errors.username && (
            <p className={styles.error}>Nom d'utilisateur requis</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" {...register("email", { required: true })} placeholder="cathydaz@gmail.com" />
          {errors.email && <p className={styles.error}>Email requis</p>}
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })} placeholder="**********"
          />
          {errors.password && (
            <p className={styles.error}>
              Mot de passe requis avec un mininum de 6 caracteres
            </p>
          )}
        </div>
        {previewSrc &&
        <div className={styles.blocImage}>
            <img src={previewSrc}alt="" />
        </div>
      }
      
        <div>
      <label htmlFor="image">Image</label>
        <input
        id='image'
        type="file"
        accept='.png, .jpg, .jpeg'
        {...register("image", {required : true})}  onChange={(e)=> onChangeImage(e)} 
        />
        </div>
           
        <button type="submit">Inscription</button>
      </form>
      </div>
    </>
  );
}
// **  Gestion du formulaire on utilise la librairie react-hook-form afin de recuperer les données des inputs et aussi assurer une validation des données
// ** La fonction onsubmit a pour role d'envoyer les données issu du formulaire au backend grace à la fonction fetch
// ** Si tout est ok on affiche une boite de dialogue avec la reponse du backend et apres on fait une redirection vers la page de connexion