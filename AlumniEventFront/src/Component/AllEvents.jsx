import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllEvents.css'; // Import your styles for the component

const AllEvents = () => {
  const [events, setEvents] = useState([]); // Stores the event list
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(''); // Error state
  const [successMessage, setSuccessMessage] = useState(''); // Success message after applying

  // Fetch events from the backend API
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/events/viewAllevents");
      setEvents(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching events:', error);
      setErrorMessage('Error fetching events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // UseEffect hook to fetch events when component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle event registration
  const handleApply = (eventName) => {
    setSuccessMessage(`Successfully registered for ${eventName}`);
  };

  return (
    <div className="events-container">
      <h1>Upcoming Events</h1>

      {/* Show error message if there's an issue fetching events */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Show success message after applying for an event */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="events-list">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.eid} className="event-item">
                <h3>{event.name}</h3>
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Location: {event.location}</p>
                <button onClick={() => handleApply(event.name)} className="apply-btn">
                  Apply
                </button>
              </div>
            ))
          ) : (
            <p>No events available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllEvents;
