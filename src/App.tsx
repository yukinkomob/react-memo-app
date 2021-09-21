import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Main from 'components/Main';
import Login from './components/Login';
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
          <Main />
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
