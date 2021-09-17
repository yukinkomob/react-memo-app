import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route path="/">
        <Login />
      </Route>
    </BrowserRouter>
  );
}

export default App;
