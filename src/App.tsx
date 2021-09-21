import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Login from './components/Login';
import List from './components/List';
import Register from './components/Register';

import './App.scss';

function App() {
  return (
    <>
      <Helmet>
        <script src="https://kit.fontawesome.com/98c77f9d64.js" crossOrigin="anonymous" />
      </Helmet>
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
    </>
  );
}

export default App;
