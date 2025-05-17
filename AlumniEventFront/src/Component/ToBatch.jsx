import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import AlumniServices from "../Service/AlumniServices";
import axios from "axios";

const ToBatch = () => {
  const [eventId, setEventId] = useState("");
  const [bid, setBid] = useState("");
  const [events, setEvents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [assigned, setAssigned] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AlumniServices.getEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => {
        console.error(err);
        setErrorMessage("Error fetching events.");
      });

    AlumniServices.getBatches()
      .then((res) => setBatches(res.data))
      .catch((err) => {
        console.error(err);
        setErrorMessage("Error fetching batches.");
      });
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!eventId || !bid) {
  //     setErrorMessage("Please select both event and batch.");
  //     return;
  //   }

  //   setLoading(true);
  //   setErrorMessage("");
  //   setAssigned(false);

  //   try {
  //     console.log(eid,bid)
  //     const response = await axios.post(
  //       "http://localhost:8080/api/assignEventToBatch/{eid}/{bid}",
  //       {
  //         eid: eventId,
  //         bid: bid,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.data === true || response.data.success) {
  //       setAssigned(true);
  //     } else {
  //       setErrorMessage("Failed to assign event to batch.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setErrorMessage("Server error during event assignment.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!eventId || !bid) {
    setErrorMessage("Please select both event and batch.");
    return;
  }

  setLoading(true);
  setErrorMessage("");
  setAssigned(false);

  try {
    const response = await axios.post(
      `http://localhost:8080/api/assignEventToBatch/${eventId}/${bid}`,
      {}, 
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data === true || response.data.success) {
      setAssigned(true);
    } else {
      setErrorMessage("Failed to assign event to batch.");
    }
  } catch (err) {
    console.error(err);
    setErrorMessage("Server error during event assignment.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="assign-event-form container mt-5">
      <h2 className="text-center mb-4">Assign Event to Batch</h2>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {assigned && (
        <Alert variant="success">Event successfully assigned to batch!</Alert>
      )}
      {loading && (
        <div className="text-center mb-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Select Event</Form.Label>
          <Form.Select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
          >
            <option value="">-- Select Event --</option>
            {events.map((event) => (
              <option key={event.eid} value={event.eid}>
                {event.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select Batch</Form.Label>
          <Form.Select
            value={bid}
            onChange={(e) => setBid(e.target.value)}
            required
          >
            <option value="">-- Select Batch --</option>
            {batches.map((batch) => (
              <option key={batch.bid} value={batch.bid}>
                {batch.batchyear}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="text-center">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Assigning..." : "Assign Event"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ToBatch;
