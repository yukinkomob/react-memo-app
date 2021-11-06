import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button, ButtonGroup, Container, ListGroup, Row,
} from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { PageType } from './Header';

export interface Task {
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
  pageType: PageType
  keyword: string
  tasks: Task[] | undefined
  updateTasks: (t: Array<Task>) => void
}

const List: React.FC<Props> = ({
  onSelectItem, pageType, keyword, tasks, updateTasks,
}) => {
  const [focusedId, setFocusedId] = useState<string>('');
  const [listType, setListType] = useState<ListType>('twoLine');
  const [sortType, setSortType] = useState<SortType>('dateSort');
  const [orderType, setOrderType] = useState<OrderType>('ascending');
  const [updatedTask, setUpdatedTask] = useState<Task | null>(null);

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
    console.log('useEffect#1');

    function updateTask(newTask: Task) {
      console.log('updateTask');
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

  function updateMarkDiv(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) {
    e.stopPropagation();
    console.log('updateMarkDiv');
    const newMarkDiv = e.currentTarget.value !== '1';
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
      if (newTask !== null && newTask !== undefined) {
        setUpdatedTask(newTask);
      }
    }
  }

  function deleteTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
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
        updateTasks(taskList);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const newTasks = tasks?.filter((t) => t.id !== id);
    console.log('newTasks', newTasks);
    if (newTasks !== undefined) {
      updateTasks(newTasks);
    }
  }

  function filterOnMark(markDivArg: boolean): boolean {
    switch (pageType) {
      case 'list':
        return !markDivArg;
      case 'warehouse':
        return markDivArg;
      case 'search':
        return true;
      default:
        return false;
    }
  }

  function filterByKeyword(task: Task): boolean {
    if (keyword === '') {
      return true;
    }
    if (task.title.indexOf(keyword) !== -1) {
      return true;
    } if (task.category.indexOf(keyword) !== -1) {
      return true;
    } if (task.description.indexOf(keyword) !== -1) {
      return true;
    } if (task.date.indexOf(keyword) !== -1) {
      return true;
    }
    return false;
  }

  function getMiimoImg(date: string): string {
    const day = new Date(date).getDay();
    switch (day) {
      case 0: // Sun
        return '/miimo-card/memorun.png';
      case 1:
        return '/miimo-card/memory.png';
      case 2:
        return '/miimo-card/memoreel.png';
      case 3:
        return '/miimo-card/meemo.png';
      case 4:
        return '/miimo-card/memozine.png';
      case 5:
        return '/miimo-card/memomo.png';
      case 6:
        return '/miimo-card/memostar.png';
      default:
        return '';
    }
  }

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

  function getListStyle(type: ListType): string {
    if (pageType === 'list') {
      return listType === type ? 'btn-outline-header-pushed' : 'btn-outline-header';
    } if (pageType === 'warehouse') {
      return listType === type ? 'btn-outline-header-pushed-gray' : 'btn-outline-header-gray';
    }
    return listType === type ? 'btn-outline-header-pushed-green' : 'btn-outline-header-green';
  }

  function getSortStyle(type: SortType): string {
    if (pageType === 'list') {
      return sortType === type ? 'btn-outline-header-pushed' : 'btn-outline-header';
    } if (pageType === 'warehouse') {
      return sortType === type ? 'btn-outline-header-pushed-gray' : 'btn-outline-header-gray';
    }
    return sortType === type ? 'btn-outline-header-pushed-green' : 'btn-outline-header-green';
  }

  function getOrderStyle(type: OrderType): string {
    if (pageType === 'list') {
      return orderType === type ? 'btn-outline-header-pushed' : 'btn-outline-header';
    } if (pageType === 'warehouse') {
      return orderType === type ? 'btn-outline-header-pushed-gray' : 'btn-outline-header-gray';
    }
    return orderType === type ? 'btn-outline-header-pushed-green' : 'btn-outline-header-green';
  }

  function getCategoryColor(): string {
    if (pageType === 'list') {
      return 'bg-category';
    } if (pageType === 'warehouse') {
      return 'bg-category-gray';
    }
    return 'bg-category-green';
  }

  function getListColor(): string {
    if (pageType === 'list') {
      return 'list-item';
    } if (pageType === 'warehouse') {
      return 'list-item-gray';
    }
    return 'list-item-green';
  }

  return (
    <div className="content-top">
      <Container className="pt-3">
        <Row>
          <ButtonGroup className="mb-3 col-2" aria-label="item-display">
            <Button className={getListStyle('twoLine')} variant="null" data-tip="2行表示" onClick={() => selectListType('twoLine')}>
              <i className="fas fa-equals" />
              <ReactTooltip effect="float" type="dark" place="bottom" />
            </Button>
            <Button className={getListStyle('expand')} variant="null" data-tip="拡大表示" onClick={() => selectListType('expand')}>
              <i className="fas fa-arrows-alt-v" />
              <ReactTooltip effect="float" type="dark" place="bottom" />
            </Button>
            <Button className={getListStyle('card')} variant="null" data-tip="カード表示" onClick={() => selectListType('card')}>
              <i className="far fa-credit-card" />
              <ReactTooltip effect="float" type="dark" place="bottom" />
            </Button>
          </ButtonGroup>
          <ButtonGroup className="mb-3 col-2 offset-6" aria-label="item-display">
            <Button className={getSortStyle('dateSort')} variant="null" data-tip="更新日時ソート" onClick={() => selectSortType('dateSort')}>
              <i className="far fa-clock" />
              <ReactTooltip effect="float" type="dark" place="bottom" />
            </Button>
            <Button className={getSortStyle('charSort')} variant="null" data-tip="文字ソート" onClick={() => selectSortType('charSort')}>
              <i className="fas fa-font" />
              <ReactTooltip effect="float" type="dark" place="bottom" />
            </Button>
            <Button className={getSortStyle('categorySort')} variant="null" data-tip="カテゴリソート" onClick={() => selectSortType('categorySort')}>
              <i className="fas fa-tag" />
              <ReactTooltip effect="float" type="dark" place="bottom" />
            </Button>
          </ButtonGroup>
          <ButtonGroup className="mb-3 col-2" aria-label="item-display">
            <Button className={getOrderStyle('ascending')} variant="null" data-tip="昇順" onClick={() => selectOrderType('ascending')}>
              <i className="fas fa-arrow-up" />
              <ReactTooltip effect="float" type="dark" place="bottom" />
            </Button>
            <Button className={getOrderStyle('descending')} variant="null" data-tip="降順" onClick={() => selectOrderType('descending')}>
              <i className="fas fa-arrow-down" />
              <ReactTooltip effect="float" type="dark" place="bottom" />
            </Button>
          </ButtonGroup>
        </Row>
        <div className="flex row">
          {/* eslint-disable max-len */
          tasks && tasks.filter((t) => filterOnMark(t.markDiv)).filter((t) => filterByKeyword(t)).sort((a, b) => {
            /* eslint-enable max-len */
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
          }).map((t) => {
            if (listType === 'twoLine' || listType === 'expand') {
              return (
                <ListGroup.Item className={getListColor()} onClick={() => onSelectItem(t.id)}>
                  <div className="cursor-pointer" onMouseEnter={() => enterListItem(t.id)} onMouseLeave={leaveListItem}>
                    <span>
                      <i className="far fa-sticky-note" />
                      {' '}
                      {t.title}
                    </span>
                    {' '}
                    {' '}
                    {' '}
                    <div className="position-absolute top-0 end-0 mt-1 me-5">
                      <span className={['block', 'text-right', 'me-5', 'badge', 'rounded-pill', getCategoryColor()].join(' ')}>{t.category}</span>
                    </div>
                    <div className="position-absolute top-0 end-0 mt-1 me-3">
                      <span className="block text-right list-date">{makeDateStr(t.date)}</span>
                    </div>
                    <br />
                    <div className="row">
                      <p className={['text-black-50 list-subtext mb-0 col-10', listType === 'expand' ? 'text-wrap' : 'text-nowrap text-truncate'].join(' ')}>
                        {'> '}
                        {t.description}
                      </p>
                      <div className="col-2 text-end">
                        <button type="button" value={t.markDiv ? '1' : '-1'} id={`markBtn${t.id}`} className={['link-warning', focusedId === t.id ? 'visible' : 'invisible', 'list-icon-button'].join(' ')} data-tip="保管する" onClick={(e) => updateMarkDiv(e, t.id)}>
                          <i className="fas fa-box me-1 cursor-pointer" />
                          <ReactTooltip effect="float" type="dark" place="bottom" />
                        </button>
                        <button type="button" id={`delBtn${t.id}`} className={['link-danger', focusedId === t.id ? 'visible' : 'invisible', 'list-icon-button'].join(' ')} data-tip="削除する" onClick={deleteTask}>
                          <i className="fas fa-trash-alt me-1 cursor-pointer" />
                          <ReactTooltip effect="float" type="dark" place="bottom" />
                        </button>
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              );
            } if (listType === 'card') {
              return (
                <>
                  <div className="card-top card mb-3 col-5 mx-4">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img className="w-100" src={getMiimoImg(t.date)} alt="profile" />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{t.title}</h5>
                          <p className="card-text card-text-area">{t.description}</p>
                          <p className="card-text"><small className="text-muted">{makeDateStr(t.date)}</small></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            }
            return <div>invalid string</div>;
          })
}
        </div>
      </Container>
    </div>
  );
};

export default List;
