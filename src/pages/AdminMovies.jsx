import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getAllMovies, addMovie, updateMovie, deleteMovie } from '../services/movieApi';

function AdminMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rating: '',
    genre: '',
    duration: '',
    posterImg: null,
  });


  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    getAllMovies().then((res) => setMovies(res.data.movies || []));
  };

  const handleAddOrEdit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('description', formData.description);
    payload.append('rating', formData.rating);
    payload.append('genre', formData.genre);
    payload.append('duration', formData.duration);

    if (formData.posterImg) {
      payload.append('posterImg', formData.posterImg);
    }

    if (editingMovie) {
      updateMovie(editingMovie._id, payload).then(() => {
        fetchMovies();
        setShowModal(false);
      });
    } else {
      addMovie(payload).then(() => {
        fetchMovies();
        setShowModal(false);
      });
    }
  };


  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      deleteMovie(id).then(() => fetchMovies());
    }
  };

  const openModal = (movie = null) => {
    if (movie) {
      setEditingMovie(movie);
      setFormData({ title: movie.title, description: movie.description, rating: movie.rating, genre: movie.genre, duration: movie.duration });
    } else {
      setEditingMovie(null);
      setFormData({ title: '', description: '', rating: '', genre: '', duration: '' });
    }
    setShowModal(true);
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-uppercase fw-bold text-secondary">Manage Movies</h2>
        <Button variant="success" onClick={() => openModal()}>Add New Movie</Button>
      </div>

      <Row xs={1} sm={2} md={3} className="g-4">
        {[...movies]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((movie) => (

            <Col key={movie._id}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="fw-semibold text-primary">{movie.title}</Card.Title>
                    <Card.Text>{movie.description}</Card.Text>
                    <Card.Text>{movie.rating}</Card.Text>
                    <Card.Text>{movie.genre}</Card.Text>
                    <Card.Text>{movie.duration}</Card.Text>
                  </div>
                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <Button variant="outline-primary" size="sm" onClick={() => openModal(movie)}>
                      Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(movie._id)}>
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingMovie ? 'Edit Movie' : 'Add Movie'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddOrEdit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter movie title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Poster Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, posterImg: e.target.files[0] })
                }
                required={!editingMovie} // Only required for "add", not "edit"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter movie description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter movie rating"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter movie genre"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter movie duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingMovie ? 'Update' : 'Add'} Movie
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default AdminMoviesPage;
