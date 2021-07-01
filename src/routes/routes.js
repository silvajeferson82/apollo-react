import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import SignIn from '../pages/SignIn';
import RouteDefault from './RouteDefault';
import PrivateRoute from './PrivateRoute';
import NotFound from '../pages/NotFound';

const Routes = () => (
    <Switch>
        <RouteDefault path="/" exact component={SignIn} />
        <PrivateRoute path="/home" component={Dashboard} />
        <Route path="/page-not-found" component={NotFound} />
        <Redirect path='*' to='/page-not-found' />
    </Switch>
)

export default Routes;