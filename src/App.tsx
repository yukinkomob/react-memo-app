import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import List from './components/List';
import './App.css';
import Register from './components/Register';

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
