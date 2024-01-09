// EventEditPage.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

import TagSelector from '../../../../components/TagSelector';

import Header from "../../../../components/Header"

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
  tags?: number[];
}

const EventEditPage = ({ params }: { params: { id: string } }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>({});
  const router = useRouter();

  useEffect(() => {
    // Fetch the event data based on the ID from the route
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/server-handler?route=/events/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }
  
        const data = await response.json();
        setEvent(data);
        
        // Convert string dates to format accepted by datetime-local input
        const formattedData = {
          ...data,
          startDateTime: formatDateStringForInput(data.startDateTime),
          endDateTime: formatDateStringForInput(data.endDateTime),
        };
        setFormData(formattedData); // Pre-fill form with existing data
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };
  
    fetchEvent();
  }, [params.id]);
  
  // Function to format string date to the format accepted by datetime-local input
  const formatDateStringForInput = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
    return formattedDate;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedEvent = { ...event, ...formData };

    try {
      // Make API call to update event
      const response = await fetch(`/api/server-handler?route=/events/${updatedEvent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      console.log(`Event with ID ${updatedEvent.id} updated.`);
      router.push('/events/manage'); // Redirect to events list page
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Container>
        <Row>
          
          <Col>
            <h1>Edit Event</h1>
          </Col>
          
        </Row>
        <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={6}>

              <Form.Check
                inline
                type="checkbox"
                label="Published"
                name="published"
                checked={formData.published || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData(prevData => ({ ...prevData, published: e.target.checked }))
                }
              />



              <Form.Check
                inline
                type="checkbox"
                label="Online Event"
                name="online"
                checked={formData.online || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData(prevData => ({ ...prevData, online: e.target.checked }))
                }
              />

          </Col>
          <Col style={{textAlign: "right"}} xs={6}>
            <TagSelector eventId={event.id} />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formStartDateTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startDateTime"
                value={formData.startDateTime || ''}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Group controlId="formEndDateTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="endDateTime"
              value={formData.endDateTime || ''}
              onChange={handleChange}
            />
          </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter description"
              rows={8}
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
            />
          </Form.Group>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Form.Group controlId="formImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                name="imageUrl"
                value={formData.imageUrl || ''}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col style={{textAlign: "right"}}>
            <Button variant="success" type="submit">
              Save Changes
            </Button>
          </Col>
        </Row>
        </Form>

        

          
            
      </Container>
    </>
   
  );
};

export default EventEditPage;
