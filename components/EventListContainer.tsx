import { Container, Row, Spinner, Alert, Col } from 'react-bootstrap';
import EventCard from './EventCard';

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
  tags?: number[]; // Assume events have an array of tag IDs
}

interface EventListContainerProps {
  events: Event[];
  locationFilter: string;
  loading: boolean;
}

const EventListContainer: React.FC<EventListContainerProps> = ({ events, locationFilter, loading }) => {
  const filteredEvents = events.filter((event) => {
    const matchesLocation = locationFilter
      ? event.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;
    return matchesLocation;
  });

  return (
    <Container>
      {loading ? (
        <Row>
          <Col style={{textAlign: "center", marginTop: "40px"}}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          </Col>
        </Row>
        
      ) : filteredEvents.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </Row>
      ) : (
        <Alert variant="warning">
          Sorry, we couldn't find any results. Adjust your filters to try again.
        </Alert>
      )}
    </Container>
  );
};

export default EventListContainer;
