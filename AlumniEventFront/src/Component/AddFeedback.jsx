import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlumniServices from '../Service/AlumniServices';
import './AddFeedback.css';

const AddFeedback = () => {
  const [sid, setSid] = useState('');
  const [studentName, setStudentName] = useState('');
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState('');
  const [feedbackDate, setFeedbackDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [events, setEvents] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Set today's date
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format: yyyy-mm-dd
  };

  useEffect(() => {
    const studentData = JSON.parse(localStorage.getItem("student"));
    if (studentData) {
      setSid(studentData.sid);
      setStudentName(studentData.name);
    } else {
      setErrorMessage("Student not found. Please login.");
    }

    setFeedbackDate(getTodayDate()); // Set default feedback date to today
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await AlumniServices.getEvents();
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setErrorMessage('Failed to load events.');
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const today = getTodayDate();

    if (!sid || !description || !selectedEvent || !feedbackDate) {
      setErrorMessage('All fields are required!');
      return;
    }

    if (description.length < 5) {
      setErrorMessage('Description should be at least 5 characters long.');
      return;
    }

    if (feedbackDate !== today) {
      setErrorMessage('Please select today\'s date as feedback date.');
      return;
    }

    const feedback = {
      sid,
      rating,
      description,
      eventId: Number(selectedEvent),
      feedbackDate
    };

    try {
      await axios.post("http://localhost:8080/api/AddFeedback", feedback);
      setSuccessMessage('Feedback submitted successfully!');
      setDescription('');
      setRating(1);
      setSelectedEvent('');
      setFeedbackDate(today);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setErrorMessage('Failed to submit feedback. Please try again later.');
    }
  };

  return (
    <div className="add-feedback-container">
      <h3 className="add-feedback-heading">Submit Your Feedback</h3>

      {successMessage && <div className="add-feedback-success">{successMessage}</div>}
      {errorMessage && <div className="add-feedback-error">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="add-feedback-form">
        <div className="add-feedback-form-group">
          <label>Event Name:</label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="add-feedback-form-control"
            required
          >
            <option value="">Select Event</option>
            {events.map((event) => (
              <option key={event.eid} value={event.eid}>
                {event.name}
              </option>
            ))}
          </select>
        </div>

        <div className="add-feedback-form-group">
          <label>Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="add-feedback-form-control"
          >
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
          </select>
        </div>

        <div className="add-feedback-form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your feedback here..."
            className="add-feedback-form-control"
          />
        </div>

        <div className="add-feedback-form-group">
          <label>Feedback Date:</label>
          <input
            type="date"
            value={feedbackDate}
            onChange={(e) => setFeedbackDate(e.target.value)}
            className="add-feedback-form-control"
          />
        </div>

        <div className="add-feedback-form-group">
          <label>Student:</label>
          <input
            type="text"
            value={studentName}
            className="add-feedback-form-control"
            disabled
          />
        </div>

        <button type="submit" className="add-feedback-submit-btn">Submit Feedback</button>
      </form>
    </div>
  );
};

export default AddFeedback;
