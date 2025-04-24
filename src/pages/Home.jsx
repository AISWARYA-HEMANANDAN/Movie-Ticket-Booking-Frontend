import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const goToMovies = () => {
    navigate('/login');
  };
  
  return (
      <div style={{ position: 'relative', zIndex: 2 }} className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="mb-4 display-4 fw-bold">WELCOME TO MOVIETIME</h1>
        <p className="lead mb-4">
          Explore the latest blockbusters and book your tickets instantly with ease!
        </p>
        <button
          onClick={goToMovies}
          className="btn btn-lg"
          style={{
            backgroundColor: '#0d6efd',
            color: '#fff',
            boxShadow: '0 0 10px #0d6efd',
            border: 'none'
          }}
        >
          Get Movies
        </button>
      </div>
  )
}

export default Home
