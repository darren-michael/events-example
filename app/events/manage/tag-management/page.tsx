// TagManagementPage.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Badge, Row, Col } from 'react-bootstrap';

import Header from "../../../../components/Header"

interface Tag {
  id: number;
  tagName: string;
}

const TagManagementPage: React.FC = () => {
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [filterText, setFilterText] = useState<string>('');

  useEffect(() => {
    fetchAllTags();
  }, []);

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

  const handleRemoveTag = async (tagId: number) => {
    try {
      const response = await fetch(`/api/server-handler?route=/events/tags/${tagId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove tag');
      }

      // Fetch the updated list of tags after removing one
      fetchAllTags();
    } catch (error) {
      console.error('Error removing tag:', error);
    }
  };

  const handleAddTag = async () => {
    try {
      const response = await fetch('/api/server-handler?route=/events/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tagName: filterText }),
      });

      if (!response.ok) {
        throw new Error('Failed to add tag');
      }

      // Fetch the updated list of tags after adding a new one
      fetchAllTags();
      setFilterText('');
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <Container>
        <h1>Tag Management</h1>
        <Row>
        <Form.Label>Filter Tags</Form.Label>
          <Col md={10}>
            <Form onSubmit={handleSubmitForm}>
              <Form.Group controlId="formFilterText">
                
                <Form.Control
                  type="text"
                  placeholder="Enter filter text"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col>
          <Button style={{margin: "0"}} variant="primary" onClick={handleAddTag}>
            Add Tag
          </Button>
          </Col>
        </Row>
       

        

        {/* Display tags as badges with close button */}
        <div style={{ marginTop: '10px' }}>
          {allTags
            .filter((tag) => tag.tagName.toLowerCase().includes(filterText.toLowerCase()))
            .map((tag) => (
              <Badge key={tag.id} pill bg="primary" style={{ marginRight: '5px', fontSize: "16px" }}>
                {tag.tagName}
                <span
                  style ={{marginLeft: "5px", cursor: "pointer"}}
                  onClick={() => handleRemoveTag(tag.id)}
                >
                  X
                </span>
              </Badge>
            ))}
        </div>
      </Container>
    </>
    
  );
};

export default TagManagementPage;
