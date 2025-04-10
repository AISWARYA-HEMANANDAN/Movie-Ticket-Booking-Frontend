import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../services/movieApi'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function Movies() {
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])

    useEffect(() => {
        getAllMovies().then((res) => {
            console.log(res?.data)
            setMovies(res?.data.movies)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    return (
        <div className="row g-2">

            {
                movies.map((movie) => (
                    <div key={movie?._id}className="col-md-4">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={movie.posterImg} />
                            <Card.Body>
                                <Card.Title>{movie?.title}</Card.Title>
                                <Card.Text>{movie?.description.slice(0, 100)}...</Card.Text>
                                <Button variant="danger" onClick={() => navigate("/booking")} >Book Tickets</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))
            }


        </div>
    )
}

export default Movies
