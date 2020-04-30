import React from 'react';
import {Switch} from 'react-router-dom';

import SingIn from '../pages/Sing-in/index';
import SingUp from '../pages/Sing-up/index';
import Dashboard from '../pages/Dashboard/index';
import Route from './Route';


const Routes: React.FC = () => {
    return(
        <Switch>
            <Route path= '/' exact component={SingIn}/>
            <Route path= '/cadastrar' exact component={SingUp}/>
            <Route path= '/painel_de_controle' exact component={Dashboard} isPrivate/>

        </Switch>
    );
};


export default Routes;