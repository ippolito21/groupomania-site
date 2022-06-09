import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navigation from '../components/navigation'
import AddPost from '../pages/addPost'
import Connexion from '../pages/connexion'
import Inscription from '../pages/inscription'

export default function Router() {
    return(
        <BrowserRouter>
            <Navigation/>
            <Routes>
                <Route path='/inscription' element={<Inscription/>}/>
                <Route path='/connexion' element={<Connexion/>}/>
                <Route path='/ajouter' element={<AddPost/>}/>
            </Routes>
        </BrowserRouter>
    )
}

// ** BrowserRouter => Composant principale
// ** Navigation => composant personel represantant la barre de navigation
// ** Routes => pour chaque route on affiche une page en particulier