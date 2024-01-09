// EventCard.tsx

import React from 'react';
import { Card, Col } from 'react-bootstrap';

interface Event {
  id: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  published: boolean;
  online: boolean;
  location: string;
  imageUrl: string;
}

const formatDateTime = (event: Event) => {
  const startdate = new Date(event.startDateTime);
  const enddate = new Date(event.endDateTime);
  return (
    <>
      {startdate.toDateString()}: {startdate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} - {enddate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}<br />
    </>
  );
};

const EventCard: React.FC<{ event: Event }> = ({ event }) => (
  <Col>
    <Card style={{ marginBottom: '20px', height: '100%' }}>
      <Card.Img variant="top" src={event.imageUrl} />
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>
          <strong>{formatDateTime(event)}
          {event.location}</strong><br/>
          {event.description}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

export default EventCard;
