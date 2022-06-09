import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./index.module.css";

export default function AddPost() {
  const [currentImage, setCurrentImage] = useState();
  const [previewSrc, setPreviewSrc] = useState();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  async function onSubmit(data) {
      const userId = localStorage.getItem("userId")
     const formData =  new FormData()
     formData.append("description", data.description)
     formData.append("image", data.image[0])
     formData.append("userId", userId)

    await fetch("http://localhost:8080/api/posts/create", {
      method: "POST",
      body: formData,
      headers: {
        Authorization : `Bearer token`
      },
    });
  }
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
    <div className={styles.blocPublication}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register("description", { required: true })} placeholder="Écrivez un commentaire..."
        ></textarea>
      </div>
      {previewSrc &&
        <div className={styles.blocImage}>
            <img src={previewSrc}alt="" />
        </div>
      }
      <div className={styles.boutons}>
      <div>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          {...register("image", { required: true })}
          onChange={(e)=> onChangeImage(e)} className={styles.boutonImg}
        />
      </div>
      <button>Publier</button>
      </div>
     
      
    </form>
    </div>
  );
}


/// *** ONsubmit => FormData car on gere des images 

/// *** function onChange => On recupere l'objet image à chaque changement et on met à jour le state currentImage

/// ***  userEffect on fait un aperçu de l'image choisi grace au  File Reader qui permet de generer une url qu'on pourra injecter au niveau de l'attribut src 