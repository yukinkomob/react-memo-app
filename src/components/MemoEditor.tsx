import axios from 'axios';
import React, {
  Fragment, useCallback, useEffect, useState,
} from 'react';
import Drawer from 'react-modern-drawer';
import {
  Button, ButtonGroup,
  Col,
  Container, FloatingLabel, Form, Row,
} from 'react-bootstrap';

import 'react-modern-drawer/dist/index.css';
import ReactTooltip from 'react-tooltip';
import { Task } from './List';

interface Props {
  newId: string
  tasks: Task[] | undefined
  updateTasks: (t: Array<Task>) => void
}

const MemoEditor: React.FC<Props> = ({ newId, tasks, updateTasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [markDiv, setMarkDiv] = useState<boolean>(false);
  const [updatedTask, setUpdatedTask] = useState<Task | null>(null);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

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
      updateTasks(tempTasks);
    }
    setTitle(newTitle);
    if (newTask !== null && newTask !== undefined) {
      setUpdatedTask(newTask);
    }
  }

  function changeCategory(e: any, id: string) {
    const newCategory = e.currentTarget.value;
    let newTask: Task | null | undefined = null;
    if (tasks !== null && tasks !== undefined) {
      const tempTasks = tasks.map((t) => {
        if (t.id === id) {
          const task = {
            id: t.id,
            title: t.title,
            category: newCategory,
            description: t.description,
            date: t.date,
            markDiv: t.markDiv,
          };
          return task;
        }
        return t;
      });
      newTask = tempTasks.find((t) => t.id === id);
      updateTasks(tempTasks);
    }
    setCategory(newCategory);
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
      updateTasks(tempTasks);
    }
    setDescription(newDescription);
    if (newTask !== null && newTask !== undefined) {
      setUpdatedTask(newTask);
    }
  }

  function changeMarkDiv() {
    const newMarkDiv = !markDiv;
    const id = selectedId;
    let newTask: Task | null | undefined = null;
    if (tasks !== null && tasks !== undefined) {
      const tempTasks = tasks.map((t) => {
        if (t.id === id) {
          const task = {
            id: t.id,
            title: t.title,
            category: t.category,
            description: t.description,
            date: t.date,
            markDiv: newMarkDiv,
          };
          return task;
        }
        return t;
      });
      newTask = tempTasks.find((t) => t.id === id);
      updateTasks(tempTasks);
    }
    setMarkDiv(newMarkDiv);
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
      setCategory(task.category);
      setDescription(task.description);
      setMarkDiv(task.markDiv);
    }
    localStorage.setItem('currentId', id);
    console.log(id);
  }

  function deleteTaskById(id: string) {
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
        updateTasks(taskList);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const newTasks = tasks?.filter((t) => t.id !== id);
    console.log('newTasks', newTasks);
    if (newTasks) {
      updateTasks(newTasks);
    }
  }

  function deleteTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log('e.currentTarget.id', e.currentTarget.id);
    const id = e.currentTarget.id.split('delBtn')[1];
    deleteTaskById(id);
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

  const findAndSetTaskParam = useCallback((currentId: string) => {
    if (tasks) {
      const task = tasks.find((t: any) => t.id === currentId);
      if (task) {
        setTitle(task.title);
        setCategory(task.category);
        setDescription(task.description);
        setMarkDiv(task.markDiv);
      }
    }
  }, [tasks]);

  useEffect(() => {
    let currentId: string | null = null;
    if (newId !== '') {
      currentId = newId;
      localStorage.setItem('currentId', currentId);
    } else {
      currentId = localStorage.getItem('currentId');
    }
    if (currentId) {
      setSelectedId(currentId);
      findAndSetTaskParam(currentId);
    }
  }, [newId, findAndSetTaskParam]);

  return (
    <div>
      <Container className="content-top pt-3">
        <div className="mb-3">
          <Row>
            <Col>
              <button type="button" className="col-3 btn btn-outline-header" onClick={toggleDrawer}>
                <i className="far fa-folder-open" />
                {' '}
                ツリーを表示
              </button>
              {/* TODO: ラベル追加 */}
              <button type="button" className="d-none btn btn-outline-secondary me-3" onClick={toggleDrawer}>
                <i className="fas fa-tags" />
                {' '}
                ラベルを追加
              </button>
              <ButtonGroup className="mb-3 col-2 offset-7" aria-label="item-display">
                <Button type="button" onClick={() => changeMarkDiv()} variant="outline-warning" data-tip={markDiv ? '一覧に戻す' : '保管する'}>
                  {markDiv ? (<i className="fas fa-list" />) : (<i className="fas fa-box-open" />)}
                  <ReactTooltip effect="float" type="dark" place="bottom" />
                </Button>
                <Button type="button" onClick={() => deleteTaskById(selectedId)} variant="outline-danger" data-tip="削除する">
                  <i className="far fa-trash-alt" />
                  <ReactTooltip effect="float" type="dark" place="bottom" />
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </div>
        <div>
          <p>
            <Form>
              {tasks && tasks.filter((t) => t.id === selectedId).map((t: Task, index: number) => (
                <Fragment key={index.toString()}>
                  <Row className="g-2">
                    <Col md={9}>
                      <FloatingLabel className="mb-1" controlId="floatingTextarea" label="タイトル">
                        <Form.Control
                          as="input"
                          placeholder="Leave a comment here"
                          style={{ height: '3rem' }}
                          value={title}
                          onChange={(e) => changeTitle(e, t.id)}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel className="mb-1" controlId="floatingTextarea" label="カテゴリ">
                        <Form.Control
                          as="input"
                          placeholder="Leave a comment here"
                          style={{ height: '3rem' }}
                          value={category}
                          onChange={(e) => changeCategory(e, t.id)}
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                  <FloatingLabel controlId="floatingTextarea" label="内容">
                    <Form.Control
                      size="sm"
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: '70vh' }}
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
};

export default MemoEditor;
