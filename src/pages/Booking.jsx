import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMovie } from '../services/movieApi'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Booking() {
    const navigate = useNavigate()

    const [movie, setMovie] = useState([])

    useEffect(() => {
        getMovie().then((res) => {
            console.log(res?.data)
            setMovie(res?.data.movies)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={movie.posterImg} />
                <Card.Body>
                    <Card.Title>{movie?.title}</Card.Title>
                    <Card.Text>{movie?.description}</Card.Text>
                    <Button variant="danger" onClick={() => navigate("/payment")} >Book Now</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Booking
