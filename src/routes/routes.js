import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import SignIn from '../pages/SignIn';
import PrivateRoute from './PrivateRoute';

const Routes = () => (
    
    <Switch>
        <Route path="/login" exact component={SignIn}/>
        {/* <Route path="/home" exact component={Dashboard}/> */}
        <PrivateRoute path="/home" exact component={Dashboard}/>
    </Switch>
  
)

export default Routes;