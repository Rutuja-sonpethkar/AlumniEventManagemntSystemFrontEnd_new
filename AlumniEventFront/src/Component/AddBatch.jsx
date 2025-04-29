import React, { useState } from 'react';

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
        body: JSON.stringify({ batchyear: trimmedYear }), // Backend expects 'batchyear'
      });

      if (response.ok) {
        setMessage('✅ Batch added successfully!');
        setBatchYear('');
      } else {
        setMessage('❌ Failed to add batch.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Server error occurred.');
    }
  };

  return (
    <div className="container mt-5" >
      <h4>Add Batch</h4>
      <form onSubmit={handleAddBatch} >
        <input
          type="text"
          className="form-control"
          style={{ maxWidth: '220px' }}
          placeholder="Enter Batch Year"
          value={batchYear}
          onChange={(e) => setBatchYear(e.target.value)}
        /><br></br>
        <button type="submit" className="btn btn-primary">Add Year</button>
      </form>
      {message && (
        <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'} py-2 px-3`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AddBatch;
