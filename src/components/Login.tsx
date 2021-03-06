import React, { useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { useHistory } from 'react-router';

const miimoChats = [
  'メモアプリ Memoothにようこそ！',
  'メモアプリ Memoothは生まれ立てのサービスです！',
  'メモアプリ Memoothのメモはカンタン！すぐに使いこなせます！',
  'ぜひ、ログインしてください！',
  '私の名前はMiimoといいます！',
  '私、MiimoはIconponさんのサービスから生まれました！',
  'メモアプリ MemoothはReact x TypeScriptで実装されています！',
  'メモアプリ MemoothはRaisetech フロントエンドコースの課題から生まれました！',
  'メモアプリ Memoothはまだまだ実装したい機能がたくさんあります！',
  'メモアプリ Memoothという名前にはSmoothにMemoしたい！という気持ちを込めました！',
  'メモアプリ MemoothのロゴはHatchfulさんのサービスから生まれました！',
  'UIフレームワークはBootStrap5およびReact BootStrap 2.0を利用しています！',
  'バックエンドは課題で貸与されたAPIを利用しています！',
];

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const history = useHistory();

  const headers = {
    'Content-Type': 'application/json',
  };

  const body = {
    email,
    password,
  };

  function login() {
    axios.post('https://raisetech-memo-api.herokuapp.com/api/login', body, { headers })
      .then((res) => {
        console.log(res);
        const { data } = res;
        console.log('token', data.access_token);
        localStorage.setItem('token', data.access_token);
        history.push('/Edit');
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
        console.log(e.response.data);
        console.log(e.response.status);
        if (e !== undefined) {
          switch (e.response.status) {
            case 401:
              setErrorMessage('認証情報に誤りがあります。');
              break;
            case 500:
              setErrorMessage('エラーが発生しています。');
              break;
            default:
              console.log(`errorCode = " + ${e.response.status}`);
              break;
          }
        }
      });
  }

  function getMiimoChats(): string {
    const date = new Date(Date.now());
    const idx = date.getSeconds() % miimoChats.length;
    return miimoChats[idx];
  }

  function changeEmail(e: any) {
    const newEmail = e.currentTarget.value;
    setEmail(newEmail);
  }

  function changePassword(e: any) {
    const newPassword = e.currentTarget.value;
    setPassword(newPassword);
  }

  return (
    <div>
      <Container className="position-absolute top-50 start-50 translate-middle" style={{ width: '18rem' }}>
        <Form>
          <div className="text-center mb-3">
            <img src="/login-icon.png" width="100px" alt="logo" data-tip={getMiimoChats()} />
            <ReactTooltip effect="float" type="dark" place="bottom" />
          </div>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              className="rounded-0 rounded-top border-bottom-0"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => changeEmail(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              className="rounded-0 rounded-bottom"
              placeholder="パスワード"
              value={password}
              onChange={(e) => changePassword(e)}
            />
          </Form.Group>
          <Button
            variant="null"
            type="button"
            className="w-100 mb-2 btn-outline-header-pushed"
            onClick={() => login()}
          >
            ログイン
          </Button>
          <Button variant="btn btn-outline-header" type="button" className="w-100 mb-3" href="#" data-tip="現在は非対応です…。">
            新規登録
            <ReactTooltip effect="float" type="dark" place="bottom" />
          </Button>
        </Form>
        {errorMessage !== ''
        && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      </Container>
    </div>
  );
}

export default Login;
