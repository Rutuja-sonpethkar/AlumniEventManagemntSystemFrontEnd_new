import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageEvents.css';

const ManageEvents = () => {
  const [eventList, setEventList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editEvent, setEditEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch events on component mount
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

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Manage Events</h2>

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      {loading && (
        <div className="alert alert-info" role="alert">
          Loading events, please wait...
        </div>
      )}

      <input
        type="text"
        placeholder="Search by event name"
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="event-list">
        {filteredEvents.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            No events found.
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div className="event-card" key={event.eid}>
              {editEvent && editEvent.eid === event.eid ? (
                <div className="event-edit">
                  <div className="mb-3">
                    <label>Event Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editEvent.name}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={editEvent.location}
                      onChange={handleEditChange}
                      className="form-control"
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
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
                    <button className="btn btn-secondary" onClick={() => setEditEvent(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="event-details">
                  <div className="event-item">
                    <strong>Event Name:</strong> {event.name}
                  </div>
                  <div className="event-item">
                    <strong>Location:</strong> {event.location}
                  </div>
                  <div className="event-item">
                    <strong>Date:</strong> {event.date}
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(event)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event.eid)}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageEvents;
