import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button, ButtonGroup, Container, ListGroup,
} from 'react-bootstrap';

interface Task {
  id: string,
  title: string,
  category: string,
  description: string,
  date: string,
  markDiv: boolean
}

const List = () => {
  const [tasks, setTasks] = useState<Array<Task>>();
  const [focusedId, setFocusedId] = useState<string>('');

  function makeDateStr(date: string) {
    if (date === '') {
      return '';
    }
    const today = new Date();
    const thisDay = new Date(date);
    if (today.getFullYear() === thisDay.getFullYear() && today.getMonth() === thisDay.getMonth()) {
      if (today.getDay() === thisDay.getDay()) {
        return '今日';
      } if (today.getDay() - 1 === thisDay.getDay()) {
        return '昨日';
      }
    }
    return date;
  }

  useEffect(() => {
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

    getTasks();
  }, []);

  function enter(id: string) {
    console.log('enter');
    setFocusedId(id);
  }

  function leave() {
    console.log('leave');
    setFocusedId('');
  }

  return (
    <div className="content-top">
      <Container className="pt-3">
        <ButtonGroup className="mb-3 me-3" aria-label="item-display">
          <Button className="btn-outline-header" variant="null"><i className="fas fa-equals" /></Button>
          <Button className="btn-outline-header" variant="null"><i className="fas fa-arrows-alt-v" /></Button>
          <Button className="btn-outline-header" variant="null"><i className="far fa-credit-card" /></Button>
        </ButtonGroup>
        <ButtonGroup className="mb-3 me-3" aria-label="item-display">
          <Button className="btn-outline-header" variant="null"><i className="fas fa-font" /></Button>
          <Button className="btn-outline-header" variant="null"><i className="far fa-clock" /></Button>
          <Button className="btn-outline-header" variant="null"><i className="fas fa-tag" /></Button>
        </ButtonGroup>
        <ButtonGroup className="mb-3" aria-label="item-display">
          <Button className="btn-outline-header" variant="null"><i className="fas fa-arrow-up" /></Button>
          <Button className="btn-outline-header" variant="null"><i className="fas fa-arrow-down" /></Button>
        </ButtonGroup>
        <ListGroup>
          {tasks && tasks.map((t) => (
            <ListGroup.Item className="list-item">
              <div className="cursor-pointer" onMouseEnter={() => enter(t.id)} onMouseLeave={leave}>
                <span className="text-purple-color">{t.title}</span>
                {' '}
                {' '}
                {' '}
                <div className="position-absolute top-0 end-0 mt-1 me-5">
                  <span className="block text-right me-5 badge rounded-pill bg-category">{t.category}</span>
                </div>
                <div className="position-absolute top-0 end-0 mt-1 me-3">
                  <span className="block text-right list-date">{makeDateStr(t.date)}</span>
                </div>
                <br />
                <div className="row">
                  <p className="text-nowrap text-black-50 text-truncate list-subtext mb-0 col-10">
                    {'> '}
                    {t.description}
                  </p>
                  <div className="col-2 text-end">
                    <span className={['link-warning', focusedId === t.id ? 'visible' : 'invisible'].join(' ')}><i className="fas fa-box me-2 cursor-pointer" /></span>
                    <span className={['link-danger', focusedId === t.id ? 'visible' : 'invisible'].join(' ')}><i className="fas fa-trash-alt me-1 cursor-pointer" /></span>
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default List;
