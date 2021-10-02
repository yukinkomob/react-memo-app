import axios from 'axios';
import React, { useState } from 'react';
import Header, { PageType } from './Header';
import List from './List';
import MemoEditor from './MemoEditor';

function Main() {
  const [newId, setNewId] = useState<string>('');
  const [pageType, setPageType] = useState<PageType>('list');

  function todayDateStr() {
    const date = new Date(Date.now());
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

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
      date: todayDateStr(),
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
        setPageType('edit');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function changePage(type: PageType) {
    console.log('type', type);
    setPageType(type);
  }

  function selectItem(id: string) {
    setPageType('edit');
    setNewId(id);
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
    setPageType('edit');
  }

  return (
    <>
      <Header
        onNewTask={() => newTask()}
        onRecommendTask={() => recommendTask()}
        onChangePage={(t: PageType) => changePage(t)}
      />
      {
        pageType === 'edit' && <MemoEditor newId={newId} />
      }
      {
        pageType === 'list' && <List pageType={pageType} onSelectItem={(id: string) => selectItem(id)} />
      }
      {
        pageType === 'warehouse' && <List pageType={pageType} onSelectItem={(id: string) => selectItem(id)} />
      }
    </>
  );
}

export default Main;
