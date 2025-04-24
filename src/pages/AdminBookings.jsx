import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Spinner, Row, Col, Badge, Container } from 'react-bootstrap';
import { getBookings, deleteBooking } from '../services/movieApi';
import { toast } from 'sonner';

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteBookingId, setDeleteBookingId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await getBookings();
      setBookings(response.data.bookings || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      toast.error('Error fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async () => {
    try {
      await deleteBooking(deleteBookingId);
      toast.success('Booking deleted successfully');
      fetchBookings();
      setShowModal(false);
      setDeleteBookingId(null);
    } catch (err) {
      console.error('Error deleting booking:', err);
      toast.error('Error deleting booking');
    }
  };

  const handleDeleteClick = (bookingId) => {
    setDeleteBookingId(bookingId);
    setShowModal(true);
  };

  const handleViewBookingDetails = (bookingId) => {
    const booking = bookings.find((b) => b._id === bookingId);
    setSelectedBooking(booking);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">📅 MANAGE BOOKINGS</h2>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading bookings...</p>
        </div>
      ) : (
        <Row className="g-4">
          {bookings.map((booking) => (
            <Col md={6} lg={4} key={booking._id}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="mb-0">🎟️ {booking.movie?.title || 'Untitled Movie'}</h5>
                    <Badge bg="info">{booking.seats?.length || 0} Seats</Badge>
                  </div>
                  <p className="mb-1"><strong>User:</strong> {booking.userName || 'N/A'}</p>
                  <p className="mb-1"><strong>Date:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
                  <p className="mb-2"><strong>Seats:</strong> {booking.seats?.join(', ') || 'N/A'}</p>
                  <div className="d-flex justify-content-between">
                    <Button variant="outline-primary" size="sm" onClick={() => handleViewBookingDetails(booking._id)}>
                      View Details
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(booking._id)}>
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <Modal show={!!selectedBooking} onHide={() => setSelectedBooking(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>📋 Booking Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Booking ID:</strong> {selectedBooking._id}</p>
            <p><strong>User:</strong> {selectedBooking.userName}</p>
            <p><strong>Movie:</strong> {selectedBooking.movie?.title || 'N/A'}</p>
            <p><strong>Seats:</strong> {selectedBooking.seats?.join(', ') || 'N/A'}</p>
            <p><strong>Booked At:</strong> {new Date(selectedBooking.createdAt).toLocaleString()}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedBooking(null)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>⚠️ Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this booking?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteBooking}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminBookings;
