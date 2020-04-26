import React from 'react';
import GlobalStyle from './styles/global';
import SigIn from './pages/Sing-in';
import {Authprovider} from './hooks/AuthContext';

const App: React.FC = () =>{
  return(
   <>
    <Authprovider>
      <SigIn/>
    </Authprovider>
    <GlobalStyle/>
   </>
  )
}

export default App;
