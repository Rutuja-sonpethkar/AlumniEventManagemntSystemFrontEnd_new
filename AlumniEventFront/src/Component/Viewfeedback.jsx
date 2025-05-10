import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewFeedback.css';

const ViewFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"));
    const sid = student?.sid;

    if (!sid) {
      console.error("No sid found in localStorage");
      return;
    }

    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/showstudentfeedback/${sid}`);
        setFeedbackList(response.data);
      } catch (error) {
        if (error.response?.status === 409) {
          setErrorMessage("No feedback found.");
        } else {
          setErrorMessage("Error fetching feedback.");
        }
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="view-feedback-container">
      <h3 className="view-feedback-heading">My Feedback Records</h3>
      {errorMessage && <div className="view-feedback-error">{errorMessage}</div>}
      <table className="view-feedback-table">
        <thead>
          <tr>
            <th>Feedback ID</th>
            <th>Student Name</th>
            <th>Event Name</th>
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
                <td>{feedback.sname || 'N/A'}</td>
                <td>{feedback.eventname || 'N/A'}</td>
                <td>{feedback.rating}</td>
                <td>{feedback.description}</td>
                <td>{feedback.feedbackDate || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6">No feedback found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewFeedback;
