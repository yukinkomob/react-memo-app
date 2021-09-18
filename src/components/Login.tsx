import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import ExampleToast from './ExampleToast';

function Login() {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    email: 'yukinkopen@gmail.com',
    password: 'react',
  };

  axios.post('https://raisetech-memo-api.herokuapp.com/api/login', body, { headers })
    .then((res) => {
      console.log(res);
      const { data } = res;
      console.log('token', data.access_token);
      localStorage.setItem('token', data.access_token);
    });

  return (
    <div>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">Welcome To React-Bootstrap</h1>
          <ExampleToast>
            We now have Toasts
            <span role="img" aria-label="tada">
              🎉
            </span>
          </ExampleToast>
        </Jumbotron>
      </Container>
      <input placeholder="ID" />
      <br />
      <input placeholder="Pass" />
      <br />
      <button type="submit">ログイン</button>
      <br />
      <Link to="/List">List</Link>
      <br />
      <Link to="/Register">Register</Link>
    </div>
  );
}

export default Login;
