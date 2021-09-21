import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer';
import { Container, FloatingLabel, Form } from 'react-bootstrap';
import Header from './Header';

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
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [updatedTask, setUpdatedTask] = useState<Task | null>(null);
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
        const currentId = localStorage.getItem('currentId');
        if (currentId) {
          setSelectedId(currentId);
          const task = taskList.find((t: any) => t.id === currentId);
          setTitle(task.title);
          setDescription(task.description);
        }
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function changeTitle(e: any, id: string) {
    const newTitle = e.currentTarget.value;
    let newTask: Task | null | undefined = null;
    if (tasks !== null && tasks !== undefined) {
      const tempTasks = tasks.map((t) => {
        if (t.id === id) {
          const task = {
            id: t.id,
            title: newTitle,
            category: t.category,
            description: t.description,
            date: t.date,
            markDiv: t.markDiv,
          };
          return task;
        }
        return t;
      });
      newTask = tempTasks.find((t) => t.id === id);
      setTasks(tempTasks);
    }
    setTitle(newTitle);
    if (newTask !== null && newTask !== undefined) {
      setUpdatedTask(newTask);
    }
  }

  function changeDescription(e: any, id: string) {
    const newDescription = e.currentTarget.value;
    let newTask: Task | null | undefined = null;
    if (tasks !== null && tasks !== undefined) {
      const tempTasks = tasks.map((t) => {
        if (t.id === id) {
          const task = {
            id: t.id,
            title: t.title,
            category: t.category,
            description: newDescription,
            date: t.date,
            markDiv: t.markDiv,
          };
          return task;
        }
        return t;
      });
      newTask = tempTasks.find((t) => t.id === id);
      setTasks(tempTasks);
    }
    setDescription(newDescription);
    if (newTask !== null && newTask !== undefined) {
      setUpdatedTask(newTask);
    }
  }

  function selectTask(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const id = e.currentTarget.id.split('list-')[1];
    setSelectedId(id);
    const task = tasks?.find((t) => t.id === id);
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
    localStorage.setItem('currentId', id);
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
    function updateTask(newTask: Task) {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const body = {
        title: newTask?.title,
        category: newTask?.category,
        description: newTask?.description,
        date: newTask?.date,
        mark_div: newTask?.markDiv ? 1 : 0,
      };
      axios
        .put(`https://raisetech-memo-api.herokuapp.com/api/memo/${newTask.id}`, body, {
          headers,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setUpdatedTask(null);
        });
    }

    if (updatedTask !== null) {
      console.log(updatedTask);
      updateTask(updatedTask);
    }
  }, [updatedTask]);

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <Header />
      <Container className="content-top">
        <div className="d-grid gap-3">
          <button type="button" className="btn btn-info" onClick={toggleDrawer}>ファイルリストを表示</button>
        </div>
        <div>
          <p>
            <Form>
              {tasks && tasks.filter((t) => t.id === selectedId).map((t: Task, index: number) => (
                <Fragment key={index.toString()}>
                  <FloatingLabel controlId="floatingTextarea" label="タイトル">
                    <Form.Control
                      as="input"
                      placeholder="Leave a comment here"
                      style={{ height: '3rem' }}
                      value={title}
                      onChange={(e) => changeTitle(e, t.id)}
                    />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingTextarea" label="内容">
                    <Form.Control
                      size="sm"
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: '90vh' }}
                      value={description}
                      onChange={(e) => changeDescription(e, t.id)}
                    />
                  </FloatingLabel>
                </Fragment>
              ))}
            </Form>
          </p>
        </div>
      </Container>
      <Drawer open={isOpen} onClose={toggleDrawer} direction="right">
        <div className="content-top">
          <ul>
            {tasks && tasks.map((t: Task) => (
              <li id={`list-${t.id}`} className="list-unstyled link-primary" onClick={selectTask} aria-hidden>
                {t.title}
                {' '}
                <button id={`delBtn${t.id}`} className="btn-close" type="button" onClick={deleteTask}> </button>
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </div>
  );
}

export default List;
