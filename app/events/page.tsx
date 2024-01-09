// EventList.tsx

'use client'

import { useState, useEffect } from 'react';
import { Container, Row, Form, Tabs, Tab } from 'react-bootstrap';
import EventListContainer from '../../components/EventListContainer';
import TagDropdown from '../../components/TagDropdown';

import Header from "../../components/Header"

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

interface Tag {
  id: number;
  tagName: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<number | null>(null);
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventResponse = await fetch('/api/server-handler?route=/events');
        if (!eventResponse.ok) {
          throw new Error('Failed to fetch event data');
        }

        const eventData = await eventResponse.json();
        setEvents(eventData);

        const tagResponse = await fetch('/api/server-handler?route=/events/tags');
        if (!tagResponse.ok) {
          throw new Error('Failed to fetch tag data');
        }

        const tagData = await tagResponse.json();
        setTags(tagData);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectTag = async (tagId: number) => {
    let url: string = '/api/server-handler?route=/events/';
    if (tagId) {
      url = `/api/server-handler?route=/events/by-tag/${tagId}`;
    }
    try {
      setLoading(true)
      const eventResponse = await fetch(url);
      if (!eventResponse.ok) {
        throw new Error('Failed to fetch event data');
      }

      const eventData = await eventResponse.json();
      setEvents(eventData);
      setSelectedTag(tagId);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching events by tag:', error);
    }
  };

  const renderTabs = () => {
    const tabs = [];

    // Add tab for all events
    tabs.push(
      <Tab key="all" eventKey="all" title="All Events">
        <EventListContainer loading={loading} events={events} locationFilter={locationFilter} />
      </Tab>
    );

    // Add tabs for each of the next six months, including the current month
    for (let i = 0; i <= 5; i++) {
      const nextMonth = new Date();
      nextMonth.setMonth(currentMonth + i);
      const month = nextMonth.getMonth() + 1;
      const monthName = nextMonth.toLocaleString('default', { month: 'long' });

      tabs.push(
        <Tab key={month} eventKey={month} title={monthName}>
          <EventListContainer
            loading={loading}
            events={events.filter((event) => new Date(event.startDateTime).getMonth() + 1 === month)}
            locationFilter={locationFilter}
          />
        </Tab>
      );
    }

    return tabs;
  };

  return (
    <>
      <Header />
      <Container>
        <Form.Group controlId="locationFilter">
          <Form.Label>Filter by Location:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </Form.Group>

        <TagDropdown tags={tags} onSelectTag={handleSelectTag} />

        <Tabs defaultActiveKey="all" id="events-tabs">
          {renderTabs()}
        </Tabs>
      </Container>
    </>
  );
};

export default EventList;

