import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

function Header2() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    setAdminLoggedIn(!!token);
  }, []);

  const toggleTheme = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    document.body.className = isDark ? 'bg-dark text-light' : 'bg-light text-dark';
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    setAdminLoggedIn(false);
    navigate('/admin/login');
  };

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} px-3 d-flex justify-content-between`}>
      <a className="navbar-brand d-flex align-items-center" href="#home">
        <img
          src="https://i.pinimg.com/736x/1a/06/c4/1a06c43c0049c12cf16a37c42a571dbc.jpg"
          alt="Movie time Logo"
          width="100"
          height="50"
          className="d-inline-block align-top me-2"
        />
        MOVIE TIME
      </a>

      <div className="collapse navbar-collapse justify-content-between">
        <ul className="navbar-nav me-3 mb-2 mb-lg-0">
          <li className="nav-item" onClick={() => navigate("/admin/movies")}><a className="nav-link">Movies</a></li>
          <li className="nav-item" onClick={() => navigate("/admin/screens")}><a className="nav-link">Screens</a></li>
          <li className="nav-item" onClick={() => navigate("/admin/bookings")}><a className="nav-link">Bookings</a></li>
        </ul>

        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary" onClick={toggleTheme}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          {adminLoggedIn && (
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header2;
