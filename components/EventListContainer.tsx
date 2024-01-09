import { Container, Row, Spinner } from 'react-bootstrap';
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
}

const EventListContainer: React.FC<EventListContainerProps> = ({ events, locationFilter }) => {
  const filteredEvents = events.filter((event) => {
    const matchesLocation = locationFilter
      ? event.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;
    return matchesLocation;
  });

  return (
    <Container>
      {filteredEvents.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </Row>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </Container>
  );
};

export default EventListContainer;
