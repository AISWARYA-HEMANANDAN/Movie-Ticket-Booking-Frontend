import React, { useEffect, useState } from 'react';
import { getAllMovies } from '../services/movieApi';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

function Movies() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMovies()
      .then((res) => {
        setMovies(res?.data.movies || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {movies.map((movie) => (
          <div key={movie?._id} className="col-md-4 col-sm-6">
            <Card style={{ width: '100%', minHeight: '100%' }}>
              <Card.Img
                variant="top"
                src={movie.posterImg || 'https://via.placeholder.com/300x400?text=No+Image'}
                style={{ height: '400px', objectFit: 'contain' }}
              />
              <Card.Body>
                <Card.Title>{movie?.title}</Card.Title>
                <Card.Text>{movie?.description?.slice(0, 100)}...</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Text className="fw-bold">⭐ {movie?.rating}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => navigate(`/booking/${movie._id}`)}
                  >
                    Book Tickets
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;