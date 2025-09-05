import React, { useState, useEffect } from 'react';
import './ManageFeedback.css';

const Managefeedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    fetch('http://localhost:8080/api/viewallfeedback')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch feedback data');
        }
        return response.json();
      })
      .then(data => {
        setFeedbackData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="manage-feedback-container">
      <h2>Manage Feedback Records</h2>
      <div className="table-responsive">
        <table className="manage-feedback-table">
          <thead>
            <tr>
              {/* <th>Feedback ID</th> */}
              <th>Rating</th>
              <th>Description</th>
              <th>Feedback Date</th>
              <th>Alumni Name</th>
              <th>Event Name</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.length > 0 ? (
              feedbackData.map(feedback => (
                <tr key={feedback.fid}>
                  {/* <td>{feedback.fid}</td> */}
                  <td>{feedback.rating}</td>
                  <td>{feedback.description}</td>
                  <td>{feedback.feedbackDate}</td>
                  <td>{feedback.sname}</td>
                  <td>{feedback.eventname || 'Event not linked'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No feedback available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Managefeedback;
