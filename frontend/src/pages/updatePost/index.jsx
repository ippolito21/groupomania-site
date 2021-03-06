import {useParams} from 'react-router-dom'
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getItemFromLocalStorage } from "../../libs/localstorage";
import { useForm } from "react-hook-form";
import styles from './index.module.css'
import { AuthenticationContext } from '../../context/authentication';
export default function UpdatePost() {
  const auth = useContext(AuthenticationContext)
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState();
    const [previewSrc, setPreviewSrc] = useState();
    const params = useParams()
    const { handleSubmit, register } = useForm();

    async function onSubmit(data) {
        const userStorage = getItemFromLocalStorage("authentication");
        const adminStorage = getItemFromLocalStorage("admin");
        const formData = new FormData();
        formData.append("description", data.description);
        formData.append("image", data.image[0]);
        formData.append("userId", userStorage?.userId || adminStorage?.userId);
        
        let ENDPOINT;
        let whichUser;
        if(userStorage && userStorage.userId && userStorage.token) {
          ENDPOINT = `http://localhost:8080/api/posts/update/${params.id}`
          whichUser = "user"
        }
        else if (adminStorage && adminStorage.userId && adminStorage.token){
          ENDPOINT = `http://localhost:8080/api/admin/posts/update/${params.id}`
          whichUser = "admin"
        }
        const response = await fetch(ENDPOINT, {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
         
        });
    
        if (response.ok) {
          await response.json();
          if(whichUser === "user") navigate("/");
          else if(whichUser === "admin") navigate("/admin/dashboard")
         
        }
        else {
            console.log(response)
        }
      }

      function onChangeImage(e) {
        if (e.target.files) {
          const currentImage = e.target.files[0];
          setCurrentImage(currentImage);
        } else {
          return;
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
        <h1 className={styles.title}>Page de Modification</h1>
        <div className={styles.blocPublication}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="description"></label>
              <textarea
                id="description"
                placeholder="??crivez un commentaire..."
                {...register("description", { required: true })}
              ></textarea>
            </div>

            {previewSrc && (
            <div className={styles.blocImage}>
              <img src={previewSrc} alt="" />
            </div>
          )}
            
            <div className={styles.boutons}>
              <div>
                <label htmlFor="image"></label>
                <input
                  type="file"
                  id="image"
                  className={styles.boutonImg}
                  {...register("image", { required: true })}
                  onChange={(e) => onChangeImage(e)}
                /> 
              </div>
              
              <button>Modifier</button>
            </div>
          </form>
        </div>
      </>
    )
}