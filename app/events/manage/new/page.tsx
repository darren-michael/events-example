// EventAddPage.tsx

'use client';

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

import Header from "../../../../components/Header"

interface NewEvent {
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  published: boolean;
  online: boolean;
  location: string;
  imageUrl: string;
}

const EventAddPage: React.FC = () => {
    const currentDate = new Date();
  const nextHour = new Date(currentDate.getTime() + 60 * 60 * 1000); // Add one hour

  const formatDateStringForInput = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
    return formattedDate;
  };

  const [formData, setFormData] = useState<NewEvent>({
    title: '',
    description: '',
    startDateTime: formatDateStringForInput(currentDate.toISOString()),
    endDateTime: formatDateStringForInput(nextHour.toISOString()),
    published: false,
    online: false,
    location: '',
    imageUrl: '',
  });
  const router = useRouter();

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make API call to add new event
      const response = await fetch('/api/server-handler?route=/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add new event');
      }

      console.log('New event added.');
      router.push('/events/manage'); // Redirect to events list page
    } catch (error) {
      console.error('Error adding new event:', error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Row>

          <Col>
            <h1>Add New Event</h1>
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

export default EventAddPage;
