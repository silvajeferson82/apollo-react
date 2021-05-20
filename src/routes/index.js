import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './routes';
import Login from '../pages/Login';
import App from '../App';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/home" component={App} />
  </Switch>
);

export default Routes;