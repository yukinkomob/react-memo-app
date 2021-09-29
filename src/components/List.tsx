import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button, ButtonGroup, Container, ListGroup,
} from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';

interface Task {
  id: string,
  title: string,
  category: string,
  description: string,
  date: string,
  markDiv: boolean
}

type ListType = 'twoLine' | 'expand' | 'card'
type SortType = 'dateSort' | 'charSort' | 'categorySort'
type OrderType = 'ascending' | 'descending'

interface onSelectItemType {
  (id: string): void;
}
interface Props {
  onSelectItem: onSelectItemType
}

const List: React.FC<Props> = ({ onSelectItem }) => {
  const [tasks, setTasks] = useState<Array<Task>>();
  const [focusedId, setFocusedId] = useState<string>('');
  const [listType, setListType] = useState<ListType>('twoLine');
  const [sortType, setSortType] = useState<SortType>('dateSort');
  const [orderType, setOrderType] = useState<OrderType>('ascending');

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

  function enterListItem(id: string) {
    setFocusedId(id);
  }

  function leaveListItem() {
    setFocusedId('');
  }

  function selectListType(type: ListType) {
    setListType(type);
  }

  function selectSortType(type: SortType) {
    setSortType(type);
  }

  function selectOrderType(type: OrderType) {
    setOrderType(type);
  }

  return (
    <div className="content-top">
      <Container className="pt-3">
        <ButtonGroup className="mb-3 me-5" aria-label="item-display">
          <Button className={listType === 'twoLine' ? 'btn-outline-header-pushed' : 'btn-outline-header'} variant="null" data-tip="2行表示" onClick={() => selectListType('twoLine')}>
            <i className="fas fa-equals" />
            <ReactTooltip effect="float" type="dark" place="bottom" />
          </Button>
          <Button className={listType === 'expand' ? 'btn-outline-header-pushed' : 'btn-outline-header'} variant="null" data-tip="拡大表示" onClick={() => selectListType('expand')}>
            <i className="fas fa-arrows-alt-v" />
            <ReactTooltip effect="float" type="dark" place="bottom" />
          </Button>
          <Button className={listType === 'card' ? 'btn-outline-header-pushed' : 'btn-outline-header'} variant="null" data-tip="カード表示" onClick={() => selectListType('card')}>
            <i className="far fa-credit-card" />
            <ReactTooltip effect="float" type="dark" place="bottom" />
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mb-3 me-2" aria-label="item-display">
          <Button className={sortType === 'dateSort' ? 'btn-outline-header-pushed' : 'btn-outline-header'} variant="null" data-tip="更新日時ソート" onClick={() => selectSortType('dateSort')}>
            <i className="far fa-clock" />
            <ReactTooltip effect="float" type="dark" place="bottom" />
          </Button>
          <Button className={sortType === 'charSort' ? 'btn-outline-header-pushed' : 'btn-outline-header'} variant="null" data-tip="文字ソート" onClick={() => selectSortType('charSort')}>
            <i className="fas fa-font" />
            <ReactTooltip effect="float" type="dark" place="bottom" />
          </Button>
          <Button className={sortType === 'categorySort' ? 'btn-outline-header-pushed' : 'btn-outline-header'} variant="null" data-tip="カテゴリソート" onClick={() => selectSortType('categorySort')}>
            <i className="fas fa-tag" />
            <ReactTooltip effect="float" type="dark" place="bottom" />
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mb-3" aria-label="item-display">
          <Button className={orderType === 'ascending' ? 'btn-outline-header-pushed' : 'btn-outline-header'} variant="null" data-tip="昇順" onClick={() => selectOrderType('ascending')}>
            <i className="fas fa-arrow-up" />
            <ReactTooltip effect="float" type="dark" place="bottom" />
          </Button>
          <Button className={orderType === 'descending' ? 'btn-outline-header-pushed' : 'btn-outline-header'} variant="null" data-tip="降順" onClick={() => selectOrderType('descending')}>
            <i className="fas fa-arrow-down" />
            <ReactTooltip effect="float" type="dark" place="bottom" />
          </Button>
        </ButtonGroup>
        <ListGroup>
          {tasks && tasks.sort((a, b) => {
            const isAscending = orderType === 'ascending';
            switch (sortType) {
              case 'dateSort':
                if (isAscending) {
                  return a.date > b.date ? 1 : -1;
                }
                return a.date < b.date ? 1 : -1;

              case 'charSort':
                if (isAscending) {
                  return a.title > b.title ? 1 : -1;
                }
                return a.title < b.title ? 1 : -1;

              case 'categorySort':
                if (isAscending) {
                  return a.category > b.category ? 1 : -1;
                }
                return a.category < b.category ? 1 : -1;

              default:
                return 1;
            }
          }).map((t) => (
            <ListGroup.Item className="list-item" onClick={() => onSelectItem(t.id)}>
              <div className="cursor-pointer" onMouseEnter={() => enterListItem(t.id)} onMouseLeave={leaveListItem}>
                <span className="text-purple-color">
                  <i className="far fa-sticky-note" />
                  {' '}
                  {t.title}
                </span>
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
                    <span className={['link-warning', focusedId === t.id ? 'visible' : 'invisible'].join(' ')} data-tip="保管">
                      <i className="fas fa-box me-3 cursor-pointer" />
                      <ReactTooltip effect="float" type="dark" place="bottom" />
                    </span>
                    <span className={['link-danger', focusedId === t.id ? 'visible' : 'invisible'].join(' ')} data-tip="削除">
                      <i className="fas fa-trash-alt me-1 cursor-pointer" />
                      <ReactTooltip effect="float" type="dark" place="bottom" />
                    </span>
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
