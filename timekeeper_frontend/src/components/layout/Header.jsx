import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Header.css';

function Header() {
  const location = useLocation();
  
  return (
    <header className="header">
      <div className="logo">
        <h1>Time Keeper</h1>
      </div>
      <nav className="navigation">
        <ul>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">Beranda</Link>
          </li>
          <li className={location.pathname === '/activities' ? 'active' : ''}>
            <Link to="/activities">Kegiatan</Link>
          </li>
          <li className={location.pathname === '/categories' ? 'active' : ''}>
            <Link to="/categories">Kategori</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;