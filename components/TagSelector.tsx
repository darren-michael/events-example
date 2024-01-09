// TagSelector.tsx

import React, { useState, useEffect } from 'react';
import { Form, Badge, Button, Modal } from 'react-bootstrap';

interface Tag {
  id: number;
  tagName: string;
}

interface TagSelectorProps {
  eventId: number;
}

const TagSelector: React.FC<TagSelectorProps> = ({ eventId }) => {
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [eventTags, setEventTags] = useState<Tag[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchEventTags = async () => {
    try {
      const response = await fetch(`/api/server-handler?route=/events/${eventId}/tags`);
      if (!response.ok) {
        throw new Error('Failed to fetch event tags data');
      }

      const data = await response.json();
      setEventTags(data);
    } catch (error) {
      console.error('Error fetching event tags data:', error);
    }
  };

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const response = await fetch('/api/server-handler?route=/events/tags');
        if (!response.ok) {
          throw new Error('Failed to fetch tags data');
        }

        const data = await response.json();
        setAllTags(data);
      } catch (error) {
        console.error('Error fetching tags data:', error);
      }
    };

    fetchAllTags();
    fetchEventTags();
  }, [eventId]);

  const handleAddTag = async (tagId: number) => {
    try {
      const response = await fetch('/api/server-handler?route=/events/event-tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tagId, eventId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add tag to event');
      }

      // Fetch the updated list of event tags after adding a tag
      fetchEventTags();
    } catch (error) {
      console.error('Error adding tag to event:', error);
    }
  };

  const handleRemoveTag = async (tagId: number) => {
    try {
      const response = await fetch(`/api/server-handler?route=/events/event-tags/${eventId}/${tagId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove tag from event');
      }

      // Fetch the updated list of event tags after removing a tag
      fetchEventTags();
    } catch (error) {
      console.error('Error removing tag from event:', error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleOpenModal}>
        Open Tag Selector
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tag Selector</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Tags</h2>

          <Form style={{marginBottom: "30px"}}>
            <Form.Group controlId="formEventTags">
              <Form.Label>Tags associated with this Event<br/> (Click on tag to remove from event)</Form.Label>
              <div>
                {eventTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    pill
                    bg="secondary"
                    style={{ margin: '2px', cursor: 'pointer' }}
                    onClick={() => handleRemoveTag(tag.id)}
                  >
                    {tag.tagName}
                  </Badge>
                ))}
              </div>
            </Form.Group>
          </Form>

          <Form>
            <Form.Group controlId="formTags">
              <Form.Label>All Tags<br/> (Click Tag to add to event)</Form.Label>
              <div>
                {allTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    pill
                    style={{ margin: '2px', cursor: 'pointer' }}
                    onClick={() => handleAddTag(tag.id)}
                  >
                    {tag.tagName}
                  </Badge>
                ))}
              </div>
            </Form.Group>
          </Form>

          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TagSelector;
