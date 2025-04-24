import React, { useState, useEffect } from 'react';
import { getAllMovies, createScreen, updateScreen, deleteScreen, getAllScreens } from '../services/movieApi';
import { Button, Form, Card, Modal, Row, Col, Container } from 'react-bootstrap';
import { toast } from 'sonner';

function AdminScreens() {
  const [screens, setScreens] = useState([]);
  const [movies, setMovies] = useState([]);
  const [screenData, setScreenData] = useState({ screenNumber: '', movieId: '', totalSeats: '' });
  const [editing, setEditing] = useState(false);
  const [currentScreenId, setCurrentScreenId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteScreenId, setDeleteScreenId] = useState(null);

  useEffect(() => {
    fetchMovies();
    fetchScreens();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await getAllMovies();
      setMovies(response.data.movies || []);
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
  };

  const fetchScreens = async () => {
    try {
      const response = await getAllScreens();
      setScreens(response.data.screens || []);
    } catch (err) {
      console.error('Error fetching screens:', err.response?.data || err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScreenData({ ...screenData, [name]: value });
  };

  const handleAddScreen = async (e) => {
    e.preventDefault();
    try {
      await createScreen(screenData);
      toast.success('Screen added successfully');
      fetchScreens();
      setScreenData({ screenNumber: '', movieId: '', totalSeats: '' });
    } catch (err) {
      console.error('Error adding screen:', err);
      toast.error('Error adding screen');
    }
  };

  const handleEditScreen = async (e) => {
    e.preventDefault();
    try {
      await updateScreen(currentScreenId, screenData);
      toast.success('Screen updated successfully');
      fetchScreens();
      setEditing(false);
      setScreenData({ screenNumber: '', movieId: '', totalSeats: '' });
    } catch (err) {
      console.error('Error updating screen:', err);
      toast.error('Error updating screen');
    }
  };

  const handleDeleteScreen = async () => {
    try {
      await deleteScreen(deleteScreenId);
      toast.success('Screen deleted successfully');
      fetchScreens();
      setShowModal(false);
    } catch (err) {
      console.error('Error deleting screen:', err);
      toast.error('Error deleting screen');
    }
  };

  const handleEditClick = (screenId) => {
    setEditing(true);
    setCurrentScreenId(screenId);
    const screen = screens.find((s) => s._id === screenId);
    setScreenData({
      screenNumber: screen.screenNumber,
      movieId: screen.movieId,
      totalSeats: screen.totalSeats,
    });
  };

  const handleDeleteClick = (screenId) => {
    setDeleteScreenId(screenId);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <Container className="py-5">
      <h2 className="mb-4 fw-bold text-secondary">MANAGE SCREENS</h2>

      <Card className="mb-5 p-4 shadow-sm">
        <Form onSubmit={editing ? handleEditScreen : handleAddScreen}>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Screen Number</Form.Label>
                <Form.Control
                  type="text"
                  name="screenNumber"
                  value={screenData.screenNumber}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Select Movie</Form.Label>
                <Form.Select
                  name="movieId"
                  value={screenData.movieId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Movie</option>
                  {movies.map((movie) => (
                    <option key={movie._id} value={movie._id}>{movie.title}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Total Seats</Form.Label>
                <Form.Control
                  type="number"
                  name="totalSeats"
                  value={screenData.totalSeats}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="text-end mt-3">
            <Button variant="primary" type="submit">
              {editing ? 'Update Screen' : 'Add Screen'}
            </Button>
          </div>
        </Form>
      </Card>

      <Row xs={1} md={2} lg={3} className="g-4">
        {screens.map((screen) => (
          <Col key={screen._id}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="text-primary">Screen {screen.screenNumber}</Card.Title>
                  <Card.Text className="text-muted">
                    Movie: <strong>{screen.movie?.title || 'N/A'}</strong>
                  </Card.Text>
                  <Card.Text>Total Seats: {screen.totalSeats}</Card.Text>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <Button variant="outline-warning" size="sm" onClick={() => handleEditClick(screen._id)}>Edit</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(screen._id)}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this screen?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
          <Button variant="danger" onClick={handleDeleteScreen}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminScreens;
