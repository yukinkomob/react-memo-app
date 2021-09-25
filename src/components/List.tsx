import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';

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

  return (
    <div className="content-top">
      <Container className="pt-3">
        <ListGroup>
          {tasks && tasks.map((t) => (
            <ListGroup.Item>
              <div>
                {t.title}
                {' '}
                {' '}
                {' '}
                <span className="badge rounded-pill bg-secondary">{t.category}</span>
                <div className="position-absolute top-0 end-0 mt-1 me-3">
                  <span className="block text-right list-date">{makeDateStr(t.date)}</span>
                </div>
                <br />
                <p className="text-nowrap text-black-50 text-truncate list-subtext mb-0">
                  {'> '}
                  {t.description}
                </p>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default List;
