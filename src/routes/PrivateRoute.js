import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props)  => {
    
    let isLogged = false

    if (!!(localStorage.getItem('isAuthenticated'))) {
        const Autentication = JSON.parse(window.atob(localStorage.getItem('isAuthenticated')));

        if (Autentication.message === 'Autenticado') {
            isLogged = true
        } 
    }
    
    return isLogged ? <Route {...props}/> : <Redirect to="/"/>
}

export default PrivateRoute;