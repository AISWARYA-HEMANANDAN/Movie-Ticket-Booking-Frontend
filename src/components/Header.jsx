import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(search)}`;
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.className = !darkMode ? 'bg-dark text-light' : 'bg-light text-dark';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 d-flex justify-content-between">
      <a className="navbar-brand d-flex align-items-center" href="#home">
        <img src="https://i.pinimg.com/736x/1a/06/c4/1a06c43c0049c12cf16a37c42a571dbc.jpg" alt="Movie time Logo" width="100" height="50" className="d-inline-block align-top me-2" />
        MovieTime
      </a>

      <div className="collapse navbar-collapse">
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search movies"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>

        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item" onClick={() => navigate("/")}><a className="nav-link">Home</a></li>
            <li className="nav-item" onClick={() => navigate("/login")}><a className="nav-link">Login</a></li>
            <li className="nav-item" onClick={() => navigate("/register")}><a className="nav-link">Signup</a></li>
            <li className="nav-item" onClick={() => navigate("/movies")}><a className="nav-link">Movies</a></li>
          </ul>
        </div>

        <span><button className="btn btn-outline-secondary" onClick={toggleTheme}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}</button></span>
        

      </div>
    </nav>

  )
}

export default Header
