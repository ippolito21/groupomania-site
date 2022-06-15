import {createContext} from 'react'

const AuthenticationContext = createContext({
    userId : null,
    token : null,
    isLoggedIn : false,
    login : () => {},
    logout : () => {}
})

export {AuthenticationContext}