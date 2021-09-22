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
              {t.title}
              {' '}
              {' '}
              {' '}
              <span className="badge rounded-pill bg-secondary">{t.category}</span>
              <br />
              <p className="text-nowrap text-black-50 text-truncate list-subtext mb-0">
                {'> '}
                {t.description}
              </p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default List;
