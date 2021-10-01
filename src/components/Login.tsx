import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';

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

  function getMiimoChats(): string {
    const date = new Date(Date.now());
    const idx = date.getSeconds() % miimoChats.length;
    return miimoChats[idx];
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
            <Form.Control type="email" className="rounded-0 rounded-top border-bottom-0" placeholder="メールアドレス" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" className="rounded-0 rounded-bottom" placeholder="パスワード" />
          </Form.Group>
          <Button variant="null" type="submit" className="w-100 mb-2 btn-outline-header-pushed">
            ログイン
          </Button>
          <Button variant="btn btn-outline-header" type="button" className="w-100 mb-3" href="https://docs.google.com/forms/d/e/1FAIpQLSfQjkLLoes1I9k-mJbrAm6KJWP_Arl0H-93lwR4hJiF_qeBmg/viewform" data-tip="こちらはRaiseTech フロントエンドコース受講者のみ登録依頼が可能です。">
            新規登録
            <ReactTooltip effect="float" type="dark" place="bottom" />
          </Button>
        </Form>
      </Container>

      <br />
      <Link to="/Edit">Edit</Link>
    </div>
  );
}

export default Login;
