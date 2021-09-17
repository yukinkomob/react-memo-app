import axios from 'axios';
import React, { useState } from 'react';

function Register() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [markDiv, setMarkDiv] = useState(false);

  function register(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    console.log('');

    const token = localStorage.getItem('token');
    console.log('token', token);
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const body = {
      title,
      category,
      description,
      date,
      mark_div: markDiv ? 1 : 0,
    };

    axios
      .post('https://raisetech-memo-api.herokuapp.com/api/memo', body, {
        headers,
      })
      .then((res) => {
        console.log(res);
      });
  }

  function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
    switch (e.target.id) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'category':
        setCategory(e.target.value);
        break;
      case 'description':
        setDescription(e.target.value);
        break;
      case 'date':
        setDate(e.target.value);
        break;
      case 'mark':
        setMarkDiv(e.target.checked);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <input id="title" placeholder="タイトル" onChange={changeInput} />
      <br />
      <input id="category" placeholder="カテゴリ" onChange={changeInput} />
      <br />
      <input id="description" placeholder="メモの内容" onChange={changeInput} />
      <br />
      <input id="date" placeholder="日時" onChange={changeInput} />
      <br />
      <label htmlFor="mark">
        マーク
        <input id="mark" name="mark" type="checkbox" onChange={changeInput} />
      </label>
      <br />
      <button type="submit" onClick={register}>
        登録
      </button>
    </div>
  );
}

export default Register;
