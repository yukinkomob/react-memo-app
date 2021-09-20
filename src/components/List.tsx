import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Drawer from 'react-modern-drawer';
import { FloatingLabel, Form } from 'react-bootstrap';

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
  const [selectedId, setSelectedId] = useState<string>('');
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

  function selectTask(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const id = e.currentTarget.id.split('list-')[1];
    setSelectedId(id);
    console.log(id);
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
      <div className="d-grid gap-3">
        <button type="button" className="btn btn-outline-primary" onClick={useHistory().goBack}>戻る（削除予定）</button>
        <button type="button" className="btn btn-info" onClick={toggleDrawer}>ファイルリストを表示</button>
      </div>
      <div>
        <p>
          {tasks && tasks.filter((t) => t.id === selectedId).map((t: Task, index: number) => (
            <Fragment key={index.toString()}>
              <FloatingLabel controlId="floatingTextarea" label="タイトル">
                <Form.Control
                  as="input"
                  placeholder="Leave a comment here"
                  style={{ height: '3rem' }}
                  value={t.title}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingTextarea" label="内容">
                <Form.Control
                  size="sm"
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '90vh' }}
                  value={t.description}
                />
              </FloatingLabel>
            </Fragment>
          ))}
        </p>
      </div>
      <Drawer open={isOpen} onClose={toggleDrawer} direction="right">
        <ul>
          {tasks && tasks.map((t: Task) => (
            <li id={`list-${t.id}`} className="list-unstyled link-primary" onClick={selectTask} aria-hidden>
              {t.title}
              {' '}
              <button id={`delBtn${t.id}`} className="btn-close" type="button" onClick={deleteTask}> </button>
            </li>
          ))}
        </ul>
      </Drawer>
    </div>
  );
}

export default List;
