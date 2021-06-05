import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = (props)  => {

    let isLogged = false
    const Autentication = window.atob(localStorage.getItem('isAuthenticated'));
    console.log(Autentication);
    if (Autentication === 'Autenticado') {
        isLogged = true
        // toast.success('sucesso')
    } else {
        toast.error('E-mail ou senha incorretos!');
    }

    return isLogged ? <Route {...props}/> : <Redirect to="/login"/>
}

export default PrivateRoute;