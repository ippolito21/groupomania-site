import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "../components/navigation";
import AddPost from "../pages/addPost";
import Connexion from "../pages/connexion";
import Inscription from "../pages/inscription";
import NotFound from "../pages/notFound";
import Home from "../pages/principale";

export default function Router() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/ajouter" element={<AddPost />} />
        <Route path="*" element={<NotFound/>}  />
      </Routes>
    </BrowserRouter>
  );
}

// ** BrowserRouter => Composant principale
// ** Navigation => composant personel represantant la barre de navigation
// ** Routes => pour chaque route on affiche une page en particulier
