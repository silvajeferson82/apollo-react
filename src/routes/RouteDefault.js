import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RouteDefault = (props)  => {
    
    let isLogged = false

    if (!!(localStorage.getItem('isAuthenticated'))) {
        const Autentication = JSON.parse(window.atob(localStorage.getItem('isAuthenticated')));

        if (Autentication.message === 'Autenticado') {
            isLogged = true
        } 
    }
    
    return isLogged ? <Redirect to="/home" /> : <Route {...props}/>
}

export default RouteDefault;