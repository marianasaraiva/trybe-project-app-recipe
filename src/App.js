import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes/Routes';
import Provider from './context/Provider';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Routes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
