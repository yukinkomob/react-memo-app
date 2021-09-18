import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Drawer from 'react-modern-drawer';

import 'react-modern-drawer/dist/index.css';

interface Task {
  id: string,
  title: string,
  category: string,
  description: string,
  date: string,
  markDiv: boolean
}

function List() {
  const [tasks, setTasks] = useState<Array<Task>>();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

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
        setTasks(taskList);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function selectTask() {
    console.log('click');
  }

  function deleteTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log('e.currentTarget.id', e.currentTarget.id);
    const id = e.currentTarget.id.split('delBtn')[1];

    const token = localStorage.getItem('token');
    console.log('token', token);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .delete(`https://raisetech-memo-api.herokuapp.com/api/memo/${id}`, {
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
        setTasks(taskList);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const newTasks = tasks?.filter((t) => t.id !== id);
    console.log('newTasks', newTasks);
    setTasks(newTasks);
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <button type="button" onClick={useHistory().goBack}>戻る</button>
      <button type="button" onClick={toggleDrawer}>Show</button>
      <Drawer open={isOpen} onClose={toggleDrawer} direction="right">
        <ul>
          {tasks && tasks.map((t: Task) => (
            <li onClick={selectTask} aria-hidden>
              {t.title}
              {' '}
              <button id={`delBtn${t.id}`} type="button" onClick={deleteTask}>削除</button>
            </li>
          ))}
        </ul>
      </Drawer>
    </div>
  );
}

export default List;
