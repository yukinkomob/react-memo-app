import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <input placeholder="ID" />
      <br />
      <input placeholder="Pass" />
      <br />
      <button type="submit">ログイン</button>
      <br />
      <Link to="/List">List</Link>
    </div>
  );
}

export default Login;
