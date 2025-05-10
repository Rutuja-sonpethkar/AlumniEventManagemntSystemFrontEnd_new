import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageEvents.css';

const ManageEvents = () => {
  const [eventList, setEventList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editEvent, setEditEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);
  const [currentPagePast, setCurrentPagePast] = useState(1);
  const eventsPerPage = 3; // 3 events per row

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/events/viewAllevents");
      setEventList(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching events:', error);
      setErrorMessage('Error fetching events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eid) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/events/deleteeventById/${eid}`);
      setEventList(eventList.filter((event) => event.eid !== eid));
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting event:', error);
      setErrorMessage('Error deleting event. Please try again later.');
    }
  };

  const handleEdit = (event) => {
    setEditEvent({ ...event });
  };

  const handleSave = async () => {
    if (!editEvent.name || !editEvent.location || !editEvent.date) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await axios.put("http://localhost:8080/api/events/updateEvent", editEvent);
      const updatedList = eventList.map((ev) =>
        ev.eid === editEvent.eid ? editEvent : ev
      );
      setEventList(updatedList);
      setEditEvent(null);
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating event:', error);
      setErrorMessage('Error updating event. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredEvents = eventList.filter((event) =>
    event.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter upcoming and past events based on current date
  const currentDate = new Date();
  const upcomingEvents = filteredEvents.filter((event) => new Date(event.date) >= currentDate);
  const pastEvents = filteredEvents.filter((event) => new Date(event.date) < currentDate);

  const totalPagesUpcoming = Math.ceil(upcomingEvents.length / eventsPerPage);
  const totalPagesPast = Math.ceil(pastEvents.length / eventsPerPage);

  const currentUpcomingEvents = upcomingEvents.slice(
    (currentPageUpcoming - 1) * eventsPerPage,
    currentPageUpcoming * eventsPerPage
  );
  const currentPastEvents = pastEvents.slice(
    (currentPagePast - 1) * eventsPerPage,
    currentPagePast * eventsPerPage
  );

  const renderEventCard = (event) => (
    <div className="event-card" key={event.eid}>
      {editEvent && editEvent.eid === event.eid ? (
        <div className="event-edit">
          <div className="mb-2">
            <label>Event Name</label>
            <input
              type="text"
              name="name"
              value={editEvent.name}
              onChange={handleEditChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={editEvent.location}
              onChange={handleEditChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={editEvent.date}
              onChange={handleEditChange}
              className="form-control"
              required
            />
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-success me-2" onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button className="btn btn-secondary" onClick={() => setEditEvent(null)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="event-details">
          <h5>{event.name}</h5>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Date:</strong> {event.date}</p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(event)}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event.eid)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );

  const handlePageChangeUpcoming = (page) => {
    if (page >= 1 && page <= totalPagesUpcoming) {
      setCurrentPageUpcoming(page);
    }
  };

  const handlePageChangePast = (page) => {
    if (page >= 1 && page <= totalPagesPast) {
      setCurrentPagePast(page);
    }
  };

  return (
    <div className="container mt-2">
      <h2 className="text-center mb-4">Manage Events</h2>

      {errorMessage && (
        <div className="alert alert-danger" role="alert">{errorMessage}</div>
      )}

      {loading && !editEvent && (
        <div className="alert alert-info" role="alert">Loading events, please wait...</div>
      )}

      <input
        type="text"
        placeholder="Search by event name"
        className="form-control mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="event-section">
        {/* Upcoming Events Section */}
        <h3>Upcoming Events</h3>
        <div className="event-list">
          {currentUpcomingEvents.map(renderEventCard)}
        </div>

        {upcomingEvents.length === 0 && (
          <div className="alert alert-warning">No upcoming events found.</div>
        )}

        <div className="pagination">
          <button onClick={() => handlePageChangeUpcoming(currentPageUpcoming - 1)} disabled={currentPageUpcoming === 1}>
            Previous
          </button>
          <span>{currentPageUpcoming} / {totalPagesUpcoming}</span>
          <button onClick={() => handlePageChangeUpcoming(currentPageUpcoming + 1)} disabled={currentPageUpcoming === totalPagesUpcoming}>
            Next
          </button>
        </div>

        {/* Past Events Section */}
        <h3>Past Events</h3>
        <div className="event-list">
          {currentPastEvents.map(renderEventCard)}
        </div>

        {pastEvents.length === 0 && (
          <div className="alert alert-warning">No past events found.</div>
        )}

        <div className="pagination">
          <button onClick={() => handlePageChangePast(currentPagePast - 1)} disabled={currentPagePast === 1}>
            Previous
          </button>
          <span>{currentPagePast} / {totalPagesPast}</span>
          <button onClick={() => handlePageChangePast(currentPagePast + 1)} disabled={currentPagePast === totalPagesPast}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;
