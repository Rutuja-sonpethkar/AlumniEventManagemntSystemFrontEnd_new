import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddFeedback.css';

const AddFeedback = () => {
  const [sid, setSid] = useState('');
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState('');
  const [feedbackDate, setFeedbackDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 3000);

      return () => clearTimeout(timer); // Clear timeout if the component unmounts
    }
  }, [successMessage, errorMessage]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!sid || !description) {
      setErrorMessage('All fields are required!');
      setSuccessMessage('');
      return;
    }

    if (description.length < 5) {
      setErrorMessage('Description should be at least 5 characters long.');
      setSuccessMessage('');
      return;
    }

    // Ensure feedbackDate is null if not provided
    const feedback = {
      sid,
      rating,
      description,
      feedbackDate: feedbackDate ? feedbackDate : null,  // Set feedbackDate to null if empty
    };

    try {

      console.log(feedbackDate);
      await axios.post("http://localhost:8080/api/AddFeedback", feedback);
      setSuccessMessage("Feedback submitted successfully!");
      setErrorMessage('');
      
      // Clear form after success
      setSid('');
      setRating(1);
      setDescription('');
      setFeedbackDate('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setErrorMessage('Failed to submit feedback. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="add-feedback-container">
      <h3 className="add-feedback-heading">Submit Your Feedback</h3>

      {/* Success and error messages */}
      {successMessage && <div className="add-feedback-success">{successMessage}</div>}
      {errorMessage && <div className="add-feedback-error">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="add-feedback-form">
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
          <label>Student ID (SID):</label>
          <input
            type="text"
            value={sid}
            onChange={(e) => setSid(e.target.value)}
            placeholder="Enter your student ID"
            className="add-feedback-form-control"
          />
        </div>

        <button type="submit" className="add-feedback-submit-btn">Submit Feedback</button>
      </form>
    </div>
  );
};

export default AddFeedback;
