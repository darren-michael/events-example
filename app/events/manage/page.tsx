'use client'

import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

import Header from "../../../components/Header"

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

const EventsListPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/server-handler?route=/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events data');
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditEvent = (eventId: number) => {
    router.push(`/events/manage/${eventId}`);
  };

  const handleDeleteEvent = async (eventId: number) => {
    // Ask for confirmation before deleting the event
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    
    if (!confirmDelete) {
      return; // If the user clicks "Cancel" in the confirmation prompt, do nothing
    }
  
    try {
      // Make API call to delete event
      const response = await fetch(`/api/server-handler?route=/events/${eventId}`, { method: 'DELETE' });
  
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
  
      // Update the events state after successful deletion
      const updatedEvents = events.filter(event => event.id !== eventId);
      setEvents(updatedEvents);
  
      console.log(`Event with ID ${eventId} deleted.`);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleAddNewEvent = () => {
    router.push('/events/manage/new');
  };

  const handleTagManager = () => {
    router.push('/events/manage/tag-management');
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <h1>Events List</h1>
            <Button variant="success" onClick={handleAddNewEvent}>
              Add New Event
            </Button>
            <Button variant="primary" onClick={handleTagManager}>
              Tag Management
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <Table responsive="md" striped bordered hover style={{ verticalAlign: "middle" }}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Start Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td>{event.title}</td>
                      <td>{new Date(event.startDateTime).toLocaleString()}</td>
                      <td>
                        <Button variant="primary" onClick={() => handleEditEvent(event.id)}>
                          Edit
                        </Button>{' '}
                        <Button variant="danger" onClick={() => handleDeleteEvent(event.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EventsListPage;
