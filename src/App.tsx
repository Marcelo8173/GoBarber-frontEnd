import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';
import AppProvider from './hooks/index';
import Routes from './routes/index';


const App: React.FC = () =>{
  return(
   <>
    <AppProvider>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </AppProvider>
    
    <GlobalStyle/>
   </>
  )
}

export default App;
