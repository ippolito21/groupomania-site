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

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
console.log(token)

  const login = useCallback((userId, token) => {
    setToken(token);
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    removeItemFromLocalStorage("authentication");
    setToken(false);
  }, []);

  
  useEffect(() => {
    const userAuth = getItemFromLocalStorage("authentication") || undefined;
    console.log(userAuth, "useEffect");

    if (userAuth && userAuth.token && userAuth.userId) {
      login(userAuth.userId, userAuth.token);
    }

  }, [login]);
  let router;

  if (token) {
    router = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ajouter" element={<AddPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else {
    router = (
    <Routes>
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/connexion" element={<Connexion />} />
    </Routes>

    )
  }

  return (
    <div className="App">
      <AuthenticationContext.Provider
        value={{
          isLoggedIn: !!token,
          login: login,
          token: token,
          logout: logout,
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
// ** Navigation => composant personel represantant la barre de navigation
// ** Routes => pour chaque route on affiche une page en particulier

export default App;
