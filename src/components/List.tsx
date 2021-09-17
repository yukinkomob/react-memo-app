import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

interface Task {
  title: string,
  category: string,
  description: string,
  date: string,
  markDiv: boolean
}

function List() {
  const [tasks, setTasks] = useState<Array<Task>>();

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
            title: d.title,
            category: d.category,
            description: d.description,
            date: d.date,
            markDiv: d.mark_div,
          };
          return task;
        });
        setTasks(taskList);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <ul>
        {tasks && tasks.map((t: Task) => <li>{t.title}</li>)}
      </ul>
      <button type="button" onClick={useHistory().goBack}>戻る</button>
    </div>
  );
}

export default List;
