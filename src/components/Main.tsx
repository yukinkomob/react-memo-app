import axios from 'axios';
import React, { useState } from 'react';
import Header from './Header';
import List from './List';

function Main() {
  const [newId, setNewId] = useState<string>('');

  function newTask() {
    console.log('newPage');
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const body = {
      title: '(new)',
      category: '',
      description: '',
      date: '2021-09-22',
      mark_div: 0,
    };

    axios
      .post('https://raisetech-memo-api.herokuapp.com/api/memo', body, {
        headers,
      })
      .then((res) => {
        console.log(res);
        const task = res.data;
        setNewId(task.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Header onNewTask={() => newTask()} />
      <List newId={newId} />
    </>
  );
}

export default Main;
