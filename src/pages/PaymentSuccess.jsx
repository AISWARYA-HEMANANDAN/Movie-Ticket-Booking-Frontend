import React from 'react'
import { Link } from 'react-router-dom';
import { CheckCircle } from 'react-bootstrap-icons';

function PaymentSuccess() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <CheckCircle size={80} className="text-success mb-4" />
        <h2 className="text-success">Payment Successful!</h2>
        <p className="mt-3">Your booking has been confirmed. Enjoy your movie! 🍿🎬</p>
        <Link to="/" className="btn btn-primary mt-4">
          Go to Home
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccess
