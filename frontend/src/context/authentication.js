import {createContext} from 'react'
/*le contexte auth transmet les données entre tous les composants de l'apli sans utiliser d'accessoires*/
const AuthenticationContext = createContext({
    userId : null,
    token : null,
    isLoggedIn : false,
    login : () => {},
    logout : () => {}
})

export {AuthenticationContext}