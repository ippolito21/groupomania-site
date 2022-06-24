/*app.js est le composant parent qui crée du contenu qui sera rendu grâce à index.js qui contient notre route */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import Navigation from "./components/navigation";
import AddPost from "./pages/addPost";
import Connexion from "./pages/connexion";
import Inscription from "./pages/inscription";
import NotFound from "./pages/notFound";
import Home from "./pages/principale";

import { AuthenticationContext } from "./context/authentication";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "./libs/localstorage";
import Profile from "./pages/profile";
import UpdatePost from "./pages/updatePost";
import AdminLogin from "./pages/adminLogin";
import AdminDashboard from "./pages/adminDashboard";

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((userId, token) => {
    setToken(token);
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    removeItemFromLocalStorage("authentication");
    removeItemFromLocalStorage("admin");
    setToken(false);
  }, []);

  useEffect(() => {
    const userAuth = getItemFromLocalStorage("authentication") || undefined;
    const adminAuth = getItemFromLocalStorage("admin") || undefined;
    /*l'useEffect se lance seulement lorsque que le state (données) changement */

    if (userAuth && userAuth.token && userAuth.userId) {
      login(userAuth.userId, userAuth.token);
    }
    if (adminAuth && adminAuth.token && adminAuth.userId) {
      login(adminAuth.userId, adminAuth.token);
    }
  }, [login]);
  let router;

  if (token && !getItemFromLocalStorage("admin")) {
    router = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ajouter" element={<AddPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update/:id" element={<UpdatePost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else if (token && getItemFromLocalStorage("admin")) {
    router = (
      <Routes>
        <Route path="/update/:id" element={<UpdatePost />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else {
    router = (
      <Routes>
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/admin/connexion" element={<AdminLogin />} />
      </Routes>
    );
  }
  /*envelopper notre appl avec AuthContext surveille que chaque fois que quelque chose change 
  dans le contexte le composant enfant qui utilise ce context changent aussi*/
  return (
    <div className="App">
      <AuthenticationContext.Provider
        value={{
          isLoggedIn: !!token,
          login: login,
          token: token,
          logout: logout,
          userId: userId,
        }}
      >
        <BrowserRouter>
          <Navigation />
          {router}
        </BrowserRouter>
      </AuthenticationContext.Provider>
    </div>
  );
}

// ** BrowserRouter => Composant principale
// ** Navigation => composant personnel represantant la barre de navigation
// ** Routes => pour chaque route on affiche une page en particulier

export default App;
