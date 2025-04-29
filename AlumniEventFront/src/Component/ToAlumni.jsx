import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';

function AddEventForm() {
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [sid, setSid] = useState('');
  const [studentName, setStudentName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [events, setEvents] = useState([]); // Store created events

  // Simulate fetching student name based on sid
  

  const handleSidChange = (e) => {
    const sidValue = e.target.value;
    setSid(sidValue);
    const name = fetchStudentName(sidValue);
    setStudentName(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!eventName || !location || !eventDate || !sid) {
      setError('All fields are required!');
      return;
    }

    // Create a new event object
    const newEvent = {
      eventName,
      location,
      eventDate,
      sid,
      studentName
    };

    // Add the event to the events array
    setEvents([...events, newEvent]);

    // Reset the form
    setEventName('');
    setLocation('');
    setEventDate('');
    setSid('');
    setStudentName('');
    setSubmitted(true);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Add Event</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEventName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEventDate">
              <Form.Label>Event Date</Form.Label>
              <Form.Control
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formSid">
              <Form.Label>Alumni ID (sid)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter alumni ID"
                value={sid}
                onChange={handleSidChange}
                required
              />
              {studentName && (
                <Form.Text className="text-muted">
                  Student Name: {studentName}
                </Form.Text>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Event
            </Button>
          </Form>

          {submitted && (
            <Alert variant="success" className="mt-3">
              Event created successfully!
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}

          {/* Display the list of events */}
          <h3 className="mt-5">Upcoming Events</h3>
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                <strong>{event.eventName}</strong><br />
                Location: {event.location}<br />
                Date: {event.eventDate}<br />
                Alumni: {event.studentName} (SID: {event.sid})
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default ToAlumni;
