import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IoMdCloseCircle } from 'react-icons/io';
import './AddAlumni.css';
import axios from 'axios';
import AlumniServices from '../Service/AlumniServices';

const AddAlumni = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [isEnablestudent, setIsEnablestudent] = useState('Yes');  // Using 'isEnablestudent' as requested
  const [uid, setUid] = useState('');
  const [did, setDid] = useState('');
  const [bid, setBid] = useState('');
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const alumniData = {
      name,
      email,
      mobileNo,
      isEnablestudent,  // Using 'isEnablestudent' as requested
      uid,
      did,
      bid,
    };
   
    axios.post('http://localhost:8080/api/createAlumni', alumniData)
      .then((response) => {
        setMessage('✅ Alumni added successfully');
        setTimeout(() => navigate('/admin-dashboard'), 1500);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorMsg = error.response.data.message || 'Failed to add alumni';
          setMessage(`❌ ${errorMsg}`);
        } else {
          setMessage('❌ Failed to add alumni');
        }
        console.error('Error:', error.response?.data || error);
      });
  };

  useEffect(() => {
    AlumniServices.getDepartments()
      .then((res) => setDepartments(res.data))
      .catch((err) => setDepartments([]));

    AlumniServices.getOrganizations()
      .then((res) => setOrganizations(res.data))
      .catch((err) => setOrganizations([]));

    AlumniServices.getBatches()
      .then((res) => setBatches(res.data))
      .catch((err) => setBatches([]));
  }, []);

  return (
    <div className="container">
      <div className="text-center position-relative ">
        <h2 className="fw-bold">Add Alumni Form</h2>
        <IoMdCloseCircle
          size={30}
          className="position-absolute"
          style={{ top: 0, right: 0, cursor: 'pointer', color: '#dc3545' }}
          onClick={() => navigate('/admin-dashboard')}
        />
      </div>

      {/* Show status message if exists */}
      {message && (
        <Alert variant={message.startsWith('✅') ? 'success' : 'danger'} className="mt-3 text-center">
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Form.Group className="mb-3" style={{ flexBasis: '48%' }} controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{ flexBasis: '48%' }} controlId="formMobileNo">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter Mobile Number"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
          </Form.Group>
        </div>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Label>Enable Alumni</Form.Label>
            <Form.Select
              value={isEnablestudent}  // Using 'isEnablestudent' as requested
              onChange={(e) => setIsEnablestudent(e.target.value)}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Label>Organization</Form.Label>
            <Form.Select value={uid} onChange={(e) => setUid(e.target.value)} required>
              <option value="">Select Organization</option>
              {organizations.map((org, index) => (
                <option key={org.uid || index} value={org.uid}>
                  {org.name}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Label>Department</Form.Label>
            <Form.Select value={did} onChange={(e) => setDid(e.target.value)} required>
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={dept.did || index} value={dept.did}>
                  {dept.dname}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Label>Batch Year</Form.Label>
            <Form.Select value={bid} onChange={(e) => setBid(e.target.value)} required>
              <option value="">Select Batch</option>
              {batches.map((batch, index) => (
                <option key={batch.bid || index} value={batch.bid}>
                  {batch.batchyear}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <div className="d-flex justify-content-center mt-4">
          <Button variant="primary" type="submit" className="btn-lg px-5 py-2 fs-5">
            Add Alumni
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddAlumni;
