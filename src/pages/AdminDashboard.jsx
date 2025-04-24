import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FaFilm, FaTv, FaTicketAlt } from 'react-icons/fa';

function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    movies: 0,
    screens: 0,
    bookings: 0,
  });

  useEffect(() => {
    // Simulate fetching data
    const fetchDashboardStats = async () => {
      try {
        const stats = {
          movies: 12,
          screens: 5,
          bookings: 43,
        };
        setData(stats);
      } catch (err) {
        console.error('Error fetching dashboard stats', err);
      }
    };
    fetchDashboardStats();
  }, []);

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <h1 className="mb-4 text-center">ADMIN DASHBOARD</h1>

      <Row className="mb-5">
        <Col md={4} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <Card.Title>MOVIES</Card.Title>
                <Card.Text className="h3 text-success">{data.movies}</Card.Text>
              </div>
              <FaFilm size={40} className="text-success" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <Card.Title>SCREENS</Card.Title>
                <Card.Text className="h3 text-primary">{data.screens}</Card.Text>
              </div>
              <FaTv size={40} className="text-primary" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <Card.Title>BOOKINGS</Card.Title>
                <Card.Text className="h3 text-danger">{data.bookings}</Card.Text>
              </div>
              <FaTicketAlt size={40} className="text-danger" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="text-center">
        <Col md={4} className="mb-2">
          <Button variant="success" className="w-100" onClick={() => navigate('/admin/movies')}>
            Manage Movies
          </Button>
        </Col>
        <Col md={4} className="mb-2">
          <Button variant="primary" className="w-100" onClick={() => navigate('/admin/screens')}>
            Manage Screens
          </Button>
        </Col>
        <Col md={4} className="mb-2">
          <Button variant="danger" className="w-100" onClick={() => navigate('/admin/bookings')}>
            Manage Bookings
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
