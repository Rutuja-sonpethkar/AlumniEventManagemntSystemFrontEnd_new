import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './RegisteredEvents.css'; // CSS file with unique class names

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const student = JSON.parse(localStorage.getItem('student'));

  const fetchRegisteredEvents = async (sid) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get(`http://localhost:8080/api/studentassignevents/${sid}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setErrorMessage('Failed to fetch registered events.');
    } finally {
      setLoading(false);
    }
  };

  const cancelEvent = async (eid) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/cancle/${student.sid}/${eid}`);
      Swal.fire('Success', response.data, 'success');
      fetchRegisteredEvents(student.sid);
    } catch (error) {
      Swal.fire('Error', 'Unable to cancel registration.', 'error');
    }
  };

  useEffect(() => {
    if (student && student.sid) {
      fetchRegisteredEvents(student.sid);
    } else {
      Swal.fire('Error', 'Student not logged in.', 'error');
    }
  }, []);

  return (
    <div className="student-registered-events-wrapper">
      <h2 className="student-registered-events-title">Registered Events</h2>

      {loading && <p className="student-registered-events-loading">Loading...</p>}
      {errorMessage && <p className="student-registered-events-error">{errorMessage}</p>}

      {events.length > 0 ? (
        <table className="student-registered-events-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.eid}>
                <td data-label="Event Name">{event.eventname}</td>
                <td data-label="Location">{event.location}</td>
                <td data-label="Date">{new Date(event.date).toLocaleDateString()}</td>
                <td data-label="Status">{event.attendevent}</td>
                <td data-label="Actions">
                  <button
                    className="student-registered-events-cancel-btn"
                    onClick={() => cancelEvent(event.eid)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : !loading ? (
        <p className="student-registered-events-empty">No registered events found.</p>
      ) : null}
    </div>
  );
};

export default RegisteredEvents;
