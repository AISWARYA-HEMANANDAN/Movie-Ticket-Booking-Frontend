import React, { useState, useEffect } from 'react';
import {
  getAllMovies,
  createScreen,
  updateScreen,
  deleteScreen,
  getAllScreens,
  addMovieScheduleToScreen
} from '../services/movieApi';
import { Button, Form, Card, Modal, Row, Col, Container } from 'react-bootstrap';
import { toast } from 'sonner';

function AdminScreens() {
  const [screens, setScreens] = useState([]);
  const [movies, setMovies] = useState([]);
  const [screenData, setScreenData] = useState({ name: '', location: '', seats: '', city: '', screenType: '' });
  const [editing, setEditing] = useState(false);
  const [currentScreenId, setCurrentScreenId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteScreenId, setDeleteScreenId] = useState(null);
  const [movieSchedule, setMovieSchedule] = useState({ movieId: '', showDate: '', showTime: '' });

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

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setMovieSchedule({ ...movieSchedule, [name]: value });
  };

  const handleAddScreen = async (e) => {
    e.preventDefault();
    try {
      const processedData = {
        ...screenData,
        seats: screenData.seats.split(',').map(seat => seat.trim())
      };
      await createScreen(processedData);
      toast.success('Screen added successfully');
      fetchScreens();
      setScreenData({ name: '', location: '', seats: '', city: '', screenType: '' });
    } catch (err) {
      console.error('Error adding screen:', err);
      toast.error('Error adding screen');
    }
  };

  const handleEditScreen = async (e) => {
    e.preventDefault();
    try {
      const processedData = {
        ...screenData,
        seats: screenData.seats.split(',').map(seat => seat.trim())
      };
      await updateScreen(currentScreenId, processedData);
      toast.success('Screen updated successfully');
      fetchScreens();
      setEditing(false);
      setCurrentScreenId(null);
      setScreenData({ name: '', location: '', seats: '', city: '', screenType: '' });
    } catch (err) {
      console.error('Error updating screen:', err);
      toast.error('Error updating screen');
    }
  };

  const handleAddSchedule = async (screenId) => {
    try {
      await addMovieScheduleToScreen({ screenId, ...movieSchedule });
      toast.success('Movie schedule added');
      setMovieSchedule({ movieId: '', showDate: '', showTime: '' });
      fetchScreens();
    } catch (err) {
      console.error('Error adding movie schedule:', err);
      toast.error('Error adding schedule');
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
    const screen = screens.find((s) => s._id === screenId);
    setScreenData({
      name: screen.name || '',
      location: screen.location || '',
      seats: Array.isArray(screen.seats) ? screen.seats.join(',') : screen.seats || '',
      city: screen.city || '',
      screenType: screen.screenType || '',
    });
    setEditing(true);
    setCurrentScreenId(screenId);
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
            {['name', 'location', 'city', 'screenType'].map((field, idx) => (
              <Col md={3} key={idx}>
                <Form.Group>
                  <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                  <Form.Control
                    type="text"
                    name={field}
                    value={screenData[field] || ''}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            ))}
            <Col md={3}>
              <Form.Group>
                <Form.Label>Seats</Form.Label>
                <Form.Control
                  type="text"
                  name="seats"
                  value={screenData.seats || ''}
                  onChange={handleInputChange}
                  placeholder="E.g., A1,B2,C3"
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
              <Card.Body>
                <Card.Title className="text-primary">{screen.name}</Card.Title>
                <Card.Text className="text-muted">City: {screen.city}</Card.Text>
                <Card.Text>Location: {screen.location}</Card.Text>
                <Card.Text>
                  Seats: {screen.seats?.map((seat) => `(${seat})`).join(', ')}
                </Card.Text>
                <Card.Text>Type: {screen.screenType}</Card.Text>

                {/* ✅ Show Current Movie Schedules */}
                {screen.movieSchedules?.length > 0 && (
                  <div className="mb-3">
                    <h6 className="fw-bold text-secondary">Current Schedules:</h6>
                    {screen.movieSchedules.map((schedule, idx) => (
                      <div key={idx} className="small text-muted">
                        🎬 <strong>{schedule.movieId?.title || 'Unknown Movie'}</strong> on{' '}
                        <span>
                          {new Date(schedule.showDate).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </span>{' '}
                        at{' '}
                        <span>{schedule.showTime}</span>
                      </div>
                    ))}
                  </div>
                )}

                <hr />

                <Form className="mb-3">
                  <Form.Select name="movieId" onChange={handleScheduleChange} value={movieSchedule.movieId} required>
                    <option value="">Select Movie</option>
                    {movies.map((movie) => (
                      <option key={movie._id} value={movie._id}>{movie.title}</option>
                    ))}
                  </Form.Select>
                  <Form.Control type="date" name="showDate" value={movieSchedule.showDate} onChange={handleScheduleChange} required className="mt-2" />
                  <Form.Control type="time" name="showTime" value={movieSchedule.showTime} onChange={handleScheduleChange} required className="mt-2" />
                  <Button size="sm" className="mt-2" onClick={() => handleAddSchedule(screen._id)}>Add Schedule</Button>
                </Form>

                <div className="d-flex justify-content-end gap-2">
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
