import React from 'react';
import {Switch, Route} from 'react-router-dom';

import SingIn from '../pages/Sing-in/index';
import SingUp from '../pages/Sing-up/index';


const Routes: React.FC = () => {
    return(
        <Switch>
            <Route path= '/' exact component={SingIn}/>
            <Route path= '/cadastrar' exact component={SingUp}/>
        </Switch>
    );
};


export default Routes;