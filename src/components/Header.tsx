import React from 'react';

interface onChangePageType {
  (type: string): void;
}

interface Props {
  onNewTask: VoidFunction,
  onRecommendTask: VoidFunction,
  onChangePage: onChangePageType
}

const Header: React.FC<Props> = ({ onNewTask, onRecommendTask, onChangePage }) => (
  <nav className="navbar navbar-expand-md navbar bg-light border fixed-top">
    <div className="container-fluid">
      <img className="header-logo" src="/logo.png" width="300px" height="100px" alt="logo" />
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="http://www.google.com/navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li id="list-" className="nav-item nav-link list-unstyled link-primary cursor-pointer" onClick={onNewTask} aria-hidden>
            <i className="far fa-sticky-note" />
            {' '}
            書く
          </li>
          <li id="list-" className="nav-item nav-link list-unstyled link-primary cursor-pointer" onClick={() => onChangePage('list')} aria-hidden>
            <i className="fas fa-list" />
            {' '}
            並べて表示
          </li>
          <li id="list-" className="nav-item nav-link list-unstyled link-primary cursor-pointer" onClick={onRecommendTask} aria-hidden>
            <i className="fas fa-hand-holding-heart" />
            {' '}
            おまかせ表示
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://www.google.com/">
              <i className="fas fa-paperclip" />
              {' '}
              振り返る
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://suzuri.jp/Memooth24/">
              <i className="fas fa-store" />
              {' '}
              グッズ
            </a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="http://www.google.com/" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fas fa-user-cog" />
              {' '}
              設定
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdown01">
              <li>
                <a className="dropdown-item" href="http://www.google.com/">
                  <i className="fas fa-sign-out-alt" />
                  {' '}
                  ログアウト
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="http://www.google.com/">
                  <i className="fas fa-cog" />
                  {' '}
                  アプリの設定
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="http://www.google.com/">
                  <i className="fas fa-user" />
                  {' '}
                  アカウントの設定
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="http://www.google.com/">
                  <i className="fab fa-android" />
                  {' '}
                  Android /
                  {' '}
                  <i className="fab fa-app-store-ios" />
                  {' '}
                  iOS
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="http://www.google.com/">
                  <i className="fas fa-arrow-circle-up" />
                  {' '}
                  有料版のご紹介
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="http://www.google.com/">
                  <i className="fas fa-laptop" />
                  {' '}
                  このアプリについて
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="検索" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
);

export default Header;
