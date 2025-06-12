import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMovies } from '../services/movieApi';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then(res => setMovies(res.data.movies || res.data))
      .catch(err => console.error(err));
  }, []);

  const handleMovieClick = () => {
    navigate('/login'); // Redirect to login when any movie is clicked
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 display-4 fw-bold text-center" style={{ color: 'green' }}>WELCOME TO MOVIETIME</h1>
      <p className="lead mb-4 text-center">
        Explore the latest blockbusters and book your tickets instantly with ease!
      </p>

      <h2 className="mb-4">Now Showing</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {movies.map(movie => (
          <Col key={movie._id}>
            <Card onClick={handleMovieClick} style={{ cursor: 'pointer', height: '100%' }}>
              <Card.Img variant="top" src={movie.posterImg} style={{ height: '300px', objectFit: 'contain' }} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.genre} | ⭐ {movie.rating}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
