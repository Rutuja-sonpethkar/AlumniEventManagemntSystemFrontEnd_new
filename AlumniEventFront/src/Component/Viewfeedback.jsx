import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewFeedback.css';

const ViewFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch feedback records from the backend
  const fetchFeedback = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/viewallfeedback');
      console.log('Feedback Response:', response.data); // Log the response to check its structure

      // Check if response data is an array
      if (Array.isArray(response.data)) {
        setFeedbackList(response.data);
      } else {
        setErrorMessage('Received data is not in expected format.');
      }
    } catch (error) {
      setErrorMessage('Failed to load feedback. Please try again later.');
      console.error('Error fetching feedback:', error);
    }
  };

  return (
    <div className="view-feedback-container">
      <h3 className="view-feedback-heading">All Feedback Records</h3>

      {errorMessage && <div className="view-feedback-error">{errorMessage}</div>}

      <table className="view-feedback-table">
        <thead>
          <tr>
            <th>Feedback ID</th>
            <th>Student ID (SID)</th>
            <th>Rating</th>
            <th>Description</th>
            <th>Feedback Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.length > 0 ? (
            feedbackList.map((feedback) => (
              <tr key={feedback.fid}>
                <td>{feedback.fid}</td>
                <td>{feedback.sid}</td>
                <td>{feedback.rating}</td>
                <td>{feedback.description}</td>
                <td>{feedback.feedbackDate || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No feedback records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewFeedback;
