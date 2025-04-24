import React from 'react'
import { Link } from 'react-router-dom';
import { XCircle } from 'react-bootstrap-icons';

function PaymentFailed() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <XCircle size={80} className="text-danger mb-4" />
        <h2 className="text-danger">Payment Failed</h2>
        <p className="mt-3">Something went wrong with your payment. Please try again.</p>
        <Link to="/" className="btn btn-outline-danger mt-4">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default PaymentFailed
