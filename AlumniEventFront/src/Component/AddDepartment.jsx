import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './AddDepartment.css'; // Import your custom CSS

const AddDepartment = () => {
  const [dname, setDname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const departmentData = { dname: dname };

    axios.post('http://localhost:8080/api/AddNewDepartment', departmentData)
      .then(response => {
        console.log('Department added:', response.data);
        alert('Department added successfully!');
        setDname('');
      })
      .catch(error => {
        console.error('Error adding department:', error);
        alert('Failed to add department!');
      });
  };

  return (
    <div className="add-department-container">
      <div className="form-card">
        <h2 className="form-title">Add Department</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="dname">
            <Form.Label className="form-label">Department Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department name"
              value={dname}
              onChange={(e) => setDname(e.target.value)}
              className="form-control-custom"
              required
            />
          </Form.Group>
          <Button className="submit-btn" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddDepartment;
