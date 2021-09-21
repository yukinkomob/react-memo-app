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

  function getTasks() {
    console.log('getTasks');

    const token = localStorage.getItem('token');
    console.log('token', token);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get('https://raisetech-memo-api.herokuapp.com/api/memos', {
        headers,
      })
      .then((res) => {
        console.log(res);
        const taskList = res.data.map((d: any) => {
          const task = {
            id: d.id,
            title: d.title,
            category: d.category,
            description: d.description,
            date: d.date,
            markDiv: d.mark_div,
          };
          return task;
        });
        const total = Math.floor(1000000 * Math.random());
        const base = total % taskList.length;
        setNewId(taskList[base].id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function recommendTask() {
    console.log('recom');
    getTasks();
  }

  return (
    <>
      <Header onNewTask={() => newTask()} onRecommendTask={() => recommendTask()} />
      <List newId={newId} />
    </>
  );
}

export default Main;
