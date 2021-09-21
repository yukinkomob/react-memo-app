import React from 'react';

function Header() {
  return (
    <nav className="navbar navbar-expand-md navbar bg-light border fixed-top">
      <div className="container-fluid">
        <img className="header-logo" src="/logo.png" width="300px" height="100px" alt="logo" />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="http://www.google.com/navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item active">
              <a className="nav-link" aria-current="page" href="http://www.google.com/">
                <i className="far fa-sticky-note" />
                {' '}
                作成
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://www.google.com/">
                <i className="fas fa-list" />
                {' '}
                リストを見る
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://www.google.com/">
                <i className="fas fa-hand-holding-heart" />
                {' '}
                おまかせ表示
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://www.google.com/">
                <i className="fas fa-paperclip" />
                {' '}
                クリップ
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="http://www.google.com/" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">設定</a>
              <ul className="dropdown-menu" aria-labelledby="dropdown01">
                <li><a className="dropdown-item" href="http://www.google.com/">アクション</a></li>
                <li><a className="dropdown-item" href="http://www.google.com/">その他のアクション</a></li>
                <li><a className="dropdown-item" href="http://www.google.com/">その他</a></li>
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
}

export default Header;
