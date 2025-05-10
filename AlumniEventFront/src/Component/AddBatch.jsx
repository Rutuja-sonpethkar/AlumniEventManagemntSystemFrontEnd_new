import React, { useState } from 'react';
import './AddBatch.css'; 
const AddBatch = () => {
  const [batchYear, setBatchYear] = useState('');
  const [message, setMessage] = useState('');

  const handleAddBatch = async (e) => {
    e.preventDefault();
    const trimmedYear = batchYear.trim();

    if (!trimmedYear) {
      alert('Please enter a batch year');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/AddBatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ batchyear: trimmedYear }),
      });

      if (response.ok) {
        setMessage('✅ Batch added successfully!');
        setBatchYear('');
        
       
        setTimeout(() => {
          setMessage('');
        }, 2000);
      } else {
        setMessage('❌ Failed to add batch.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Server error occurred.');
    }
  };

  return (
    <div className="batch-container">
      <div className="batch-box">
        <h4 className="batch-title">Add Batch</h4>
        <form onSubmit={handleAddBatch}>
          <input
            type="text"
            placeholder="Enter Batch Year"
            className="form-control batch-input"
            value={batchYear}
            onChange={(e) => setBatchYear(e.target.value)}
          />
          <button type="submit" className="btn btn-primary batch-button">
            Add Year
          </button>
        </form>
        {message && (
          <div className={`batch-message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBatch;
