import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import { jwtDecode } from "jwt-decode";
import { Dropdown, Nav, Navbar, Container, Form, Button, Image } from 'react-bootstrap';

function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("admin-token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setRole('user');
      } catch (err) {
        console.error("Invalid user token", err);
        localStorage.removeItem("token");
      }
    } else if (adminToken) {
      try {
        const decoded = jwtDecode(adminToken);
        setUser(decoded);
        setRole('admin');
      } catch (err) {
        console.error("Invalid admin token", err);
        localStorage.removeItem("admin-token");
      }
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  const toggleTheme = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    document.body.className = isDark ? 'bg-dark text-light' : 'bg-light text-dark';
  };

  const handleLogout = () => {
    if (role === 'admin') {
      localStorage.removeItem("admin-token");
    } else {
      localStorage.removeItem("token");
    }
    setUser(null);
    setRole(null);
    navigate("/login");
  };

  const getAvatar = () => {
    if (user?.avatar) {
      return <Image src={user.avatar} roundedCircle width={30} height={30} className="me-2" />;
    } else {
      const initial = user?.name?.charAt(0)?.toUpperCase() || 'U';
      return (
        <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-2"
          style={{ width: '30px', height: '30px', fontSize: '16px' }}>
          {initial}
        </div>
      );
    }
  };

  return (
    <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src="https://i.pinimg.com/736x/1a/06/c4/1a06c43c0049c12cf16a37c42a571dbc.jpg"
            alt="Movie time Logo" width="100" height="50" className="d-inline-block align-top me-2" />
          MOVIE TIME
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content">
          <Form className="d-flex me-auto" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search movies"
              className="me-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)} />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>

          <Nav className="align-items-center">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            {!user ? (
              <>
                <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
                <Nav.Link onClick={() => navigate("/admin/login")}>Admin Login</Nav.Link>
              </>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-primary" id="dropdown-user" className="d-flex align-items-center">
                  {getAvatar()}
                  {user.name || (role === 'admin' ? "Admin" : "User")}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {role === 'admin' && (
                    <Dropdown.Item onClick={() => navigate("/admin/dashboard")}>
                      Admin Dashboard
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}

            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={toggleTheme}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
