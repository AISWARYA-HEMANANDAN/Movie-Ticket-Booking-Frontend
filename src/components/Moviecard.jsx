import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Moviecard() {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-250,h-390/et00305698-jquqhbdnvv-portrait.jpg" />
      <Card.Body>
        <Card.Title>Movie Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">View Details</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Moviecard
