import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import List from './components/List';
import './App.scss';
import Register from './components/Register';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Route exact path="/List">
        <List />
      </Route>
      <Route exact path="/Register">
        <Register />
      </Route>
      <Route exact path="/">
        <Login />
      </Route>
    </Router>
  );
}

export default App;
