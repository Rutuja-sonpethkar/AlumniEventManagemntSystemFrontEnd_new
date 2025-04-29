import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import AlumniServices from "../Service/AlumniServices";
import axios from "axios";

const ToBatch = () => {
  const [eventId, setEventId] = useState("");
  const [bid, setBid] = useState("");
  const [events, setEvents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [assignedEvent, setAssignedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch events and batches from the API when the component mounts
    AlumniServices.getEvents()
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        setErrorMessage("Error fetching event data.");
        console.error(err);
      });

    AlumniServices.getBatches()
      .then((res) => {
        setBatches(res.data);
      })
      .catch((err) => {
        setErrorMessage("Error fetching batch data.");
        console.error(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const response = axios.post(
      `http://localhost:8080/api/assignEventToBatch/${eventId}/${bid}`
    );
    console.log(response);

    console.log(eventId + "\t" + bid);

    // if (!eventName || !bid) {
    //   setErrorMessage("Event name and batch year are required.");
    //   return;
    // }

    setLoading(true);
    // const eventData = { eventName, bid };

    // Simulate API call to assign event to batch (you can replace it with actual API call)
    setTimeout(() => {
      // setAssignedEvent(eventData);
      // setEventName("");
      setBid("");
      setErrorMessage("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="assign-event-form">
      <h2 className="text-center mb-4">Assign Event to Batch</h2>

      {errorMessage && (
        <Alert variant="danger" className="text-center">
          {errorMessage}
        </Alert>
      )}

      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <Form onSubmit={handleSubmit} className="event-form">
        <Row md={12}>
          <Form.Label>Event Name</Form.Label>
          <Form.Select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
          >
            <option value="">Select Event</option>
            {events.map((event, index) => (
              <option key={event.eid || index} value={event.eid}>
                {event.name}
              </option>
            ))}
          </Form.Select>
        </Row>

        <Row md={12}>
          <Form.Label>Batch Year</Form.Label>
          <Form.Select
            value={bid}
            onChange={(e) => setBid(e.target.value)}
            required
          >
            <option value="">Select Batch</option>
            {batches.map((batch, index) => (
              <option key={batch.bid || index} value={batch.bid}>
                {batch.batchyear}
              </option>
            ))}
          </Form.Select>
        </Row>

        <br></br>
        <div className="text-center">
          <Button variant="primary" type="submit" className="w-50">
            Assign Event
          </Button>
        </div>
      </Form>

      {assignedEvent && (
        <div className="mt-4">
          <h4>Event Assigned Successfully!</h4>
          <p>
            <strong>Event Name:</strong>{" "}
            {events.find((e) => e.eid === assignedEvent.eventName)?.eventName ||
              "N/A"}
          </p>
          <p>
            <strong>Batch Year:</strong>{" "}
            {batches.find((b) => b.bid === assignedEvent.bid)?.batchyear ||
              "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ToBatch;
