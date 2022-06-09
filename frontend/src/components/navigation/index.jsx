import {Link} from 'react-router-dom'
import logo from '../../images/icon-left-font-removebg-preview.png'

import styles from './index.module.css'
export default function Navigation(){
    return (
        <nav className={styles.navigation}>
            <Link to="/"><img src={logo} alt="Logo Groupomania" /></Link>
            <ul>
                <li><Link to="/inscription">Inscription</Link></li>
                <li><Link to="/connexion">Connexion</Link></li>
                <li><Link to="/ajouter">ajouter</Link></li>
            </ul>
        </nav>
    )
}