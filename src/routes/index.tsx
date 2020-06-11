import React from 'react';
import {Switch} from 'react-router-dom';

import SingIn from '../pages/Sing-in/index';
import SingUp from '../pages/Sing-up/index';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard/index';
import Route from './Route';
import Profile from '../pages/Profile';

const Routes: React.FC = () => {
    return(
        <Switch>
            <Route path= '/' exact component={SingIn}/>
            <Route path= '/cadastrar' exact component={SingUp}/>
            <Route path= '/recuperar_senha' exact component={ForgotPassword}/>
            <Route path= '/reset-password' exact component={ResetPassword}/>

            <Route path= '/painel_de_controle' exact component={Dashboard} isPrivate/>
            <Route path = '/profile' exact component={Profile} isPrivate/>

        </Switch>
    );
};


export default Routes;