import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

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
      <Container className="mt-5" style={{ width: '18rem' }}>
        <Form>
          <h3 className="text-center mb-3">サインイン</h3>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" className="rounded-0 rounded-top border-bottom-0" placeholder="メールアドレス" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" className="rounded-0 rounded-bottom" placeholder="パスワード" />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mb-2">
            ログイン
          </Button>
          <Button variant="btn btn-outline-primary" type="button" className="w-100 mb-3" href="https://docs.google.com/forms/d/e/1FAIpQLSfQjkLLoes1I9k-mJbrAm6KJWP_Arl0H-93lwR4hJiF_qeBmg/viewform">
            新規登録
          </Button>
        </Form>
      </Container>

      <br />
      <Link to="/Edit">Edit</Link>
      <br />
      <Link to="/Register">Register</Link>
    </div>
  );
}

export default Login;
