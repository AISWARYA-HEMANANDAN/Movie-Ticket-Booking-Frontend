import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById, getAllScreens, createBooking, makePayment } from '../services/movieApi';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHED_KEY_STRIPE);

function Booking() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDate, setShowDate] = useState('');
  const [showTime, setShowTime] = useState('');
  const [screenId, setScreenId] = useState('');
  const [ticketPrice, setTicketPrice] = useState(0);
  const [notAvailableSeats, setNotAvailableSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [message, setMessage] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const availableShowTimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];
  const seatRows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatCols = Array.from({ length: 10 }, (_, i) => i + 1);

  useEffect(() => {
    const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    setTotalPrice(total);
  }, [selectedSeats]);

  useEffect(() => {
    if (id) {
      getMovieById(id)
        .then((res) => {
          setMovie(res?.data.movie || res?.data.film);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  useEffect(() => {
    const fetchAvailableScreen = async () => {
      if (id && showDate && showTime) {
        try {
          const res = await getAllScreens(id, showDate, showTime);
          const allScreens = res.data?.screens || [];

          console.log("Fetched screens:", allScreens);
          console.log("Frontend selected showDate:", showDate);
          console.log("Frontend selected showTime:", showTime);

          allScreens.forEach(screen => {
            screen.movieSchedules.forEach(s => {
              console.log("Backend schedule showDate (ISO):", new Date(s.showDate).toISOString().split('T')[0]);
              console.log("Backend schedule showTime:", s.showTime);
              console.log("Backend schedule movieId:", s.movieId);
            });
          });


          const screen = allScreens.find(screen =>
            screen.movieSchedules?.some(schedule => {
              const backendShowDate = new Date(schedule.showDate).toISOString().split('T')[0];
              const targetDate = new Date(showDate).toISOString().split('T')[0];
              return (
                String(schedule.movieId._id) === String(id) &&
                backendShowDate === targetDate &&
                schedule.showTime === showTime
              );
            })
          );

          if (!screen) {
            setScreenId('');
            setTicketPrice(0);
            setNotAvailableSeats([]);
            setMessage("No screen available for the selected schedule.");
            return;
          }

          const schedule = screen.movieSchedules.find(schedule => {
            const backendShowDate = new Date(schedule.showDate).toISOString().split('T')[0];
            return (
              String(schedule.movieId._id) === String(id) &&
              backendShowDate === showDate &&
              schedule.showTime === showTime
            );
          });

          console.log("Matched screen:", screen);
          console.log("Matched schedule:", schedule);

          setScreenId(screen._id);
          setTicketPrice(screen.ticketPrice || 150);
          setNotAvailableSeats(schedule?.notAvailableSeats || []);
          setMessage('');
        } catch (err) {
          console.error("Error fetching screens:", err);
          setScreenId('');
          setTicketPrice(0);
          setNotAvailableSeats([]);
          setMessage(err?.response?.data?.error || "Error fetching screens.");
        }
      }
    };

    fetchAvailableScreen();
  }, [showDate, showTime, id]);

  const isSeatTaken = (row, col) =>
    notAvailableSeats.some(seat => seat.row === row && seat.col === col);

  const isSelected = (row, col) =>
    selectedSeats.some(seat => seat.row === row && seat.col === col);

  const toggleSeat = (row, col) => {
    if (isSeatTaken(row, col)) return;
    const exists = isSelected(row, col);
    if (exists) {
      setSelectedSeats(seats => seats.filter(seat => !(seat.row === row && seat.col === col)));
    } else {
      setSelectedSeats(seats => [...seats, { row, col, screenId, price: ticketPrice }]);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!showDate || !showTime) {
      setMessage("Please select both a show date and time.");
      return;
    }

    if (!screenId) {
      setMessage("No screen available for the selected schedule.");
      return;
    }

    if (selectedSeats.length === 0) {
      setMessage("Please select at least one seat.");
      return;
    }

    try {
      const res = await createBooking({
        movieId: id,
        screenId,
        showDate,
        showTime,
        seats: selectedSeats,
        totalPrice,
      });

      if (res?.data?.message) {
        setMessage(res.data.message);
        setSelectedSeats([]);

        const body = {
          movies: [
            {
              title: movie?.title,
              posterImg: movie?.posterImg,
              price: totalPrice
            }
          ]
        };

        const response = await makePayment(body);
        const sessionId = response?.data?.sessionId;
        const stripe = await stripePromise;

        if (stripe && sessionId) {
          const result = await stripe.redirectToCheckout({ sessionId });
          if (result.error) {
            console.log(result.error.message);
            setMessage("Payment failed. Please try again.");
          }
        } else {
          setMessage("Stripe failed to load");
        }
      }
    } catch (error) {
      console.error("Booking error:", error?.response?.data || error.message);
      setMessage(error.response?.data?.error || "Booking failed.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Card className="mb-4">
        <Card.Img variant="top" src={movie?.posterImg} style={{ height: '400px', objectFit: 'contain' }} />
        <Card.Body>
          <Card.Title>{movie?.title}</Card.Title>
          <Card.Text>{movie?.description}</Card.Text>
          <p><strong>Rating:</strong> ⭐ {movie?.rating}</p>
          <p><strong>Genre:</strong> {movie?.genre}</p>
          <p><strong>Duration:</strong> {movie?.duration}</p>
        </Card.Body>
      </Card>

      <h4>Book Your Tickets</h4>

      <Form onSubmit={handleBooking} className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Show Date</Form.Label>
          <Form.Control
            type="date"
            value={showDate}
            onChange={(e) => setShowDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Show Time</Form.Label>
          <Form.Select value={showTime} onChange={(e) => setShowTime(e.target.value)} required>
            <option value="">Select a time</option>
            {availableShowTimes.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="mb-3">
          <Form.Label>Select Seats</Form.Label>
          <div className="d-flex flex-column gap-2">
            {seatRows.map(row => (
              <div key={row} className="d-flex gap-2">
                {seatCols.map(col => {
                  const taken = isSeatTaken(row, col);
                  const selected = isSelected(row, col);
                  return (
                    <div
                      key={`${row}${col}`}
                      onClick={() => toggleSeat(row, col)}
                      style={{
                        width: 30,
                        height: 30,
                        textAlign: 'center',
                        lineHeight: '30px',
                        cursor: taken ? 'not-allowed' : 'pointer',
                        backgroundColor: taken ? 'gray' : selected ? 'green' : 'lightgray',
                        color: taken ? 'white' : 'black',
                        borderRadius: 4,
                        fontSize: '0.8rem'
                      }}
                    >
                      {row}{col}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {ticketPrice > 0 && selectedSeats.length > 0 && (
          <Alert variant="secondary">
            🎟️ Total Price: ₹{totalPrice}
          </Alert>
        )}

        <div style={{ marginTop: "20px", fontWeight: "bold" }}>
          Total Price: ₹{totalPrice}
        </div>

        <Button variant="primary" type="submit">
          Book Now
        </Button>
      </Form>

      {message && <Alert className="mt-3" variant="info">{message}</Alert>}
    </div>
  );
}

export default Booking;
