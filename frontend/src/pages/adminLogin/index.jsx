import {  useContext } from "react";
import {useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form";
import {AuthenticationContext} from '../../context/authentication'
import styles from "./index.module.css";

export default function AdminLogin() {
    const auth = useContext(AuthenticationContext)
    const navigate =   useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    try {
       const response =  await fetch("http://localhost:8080/api/admin/login", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
       })
       if(response.ok){
        const adminData = await response.json()
        localStorage.setItem("admin", JSON.stringify(adminData))
        auth.login(adminData.userId, adminData.token)
        navigate("/admin/dashboard")
       }
    } catch (error) {
        
    }
  }
  return (
    <div className={styles.blocForm}>
      <h1 className={styles.title}>Connexion Administration</h1>
      <form className={styles.form} onSubmit={handleSubmit(onsubmit)}>
        <div>
          <label htmlFor="username">Nom d'administrateur</label>
          <input
            type="text"
            {...register("username", { required: true })}
            placeholder="françoise"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="cathydaz@gmail.com"
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="**********"
          />
        </div>

        <button type="submit">Connexion Adminstrateur</button>
      </form>
    </div>
  );
}
