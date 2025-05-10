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
  const [isEnablestudent, setIsEnablestudent] = useState('Yes');
  const [uid, setUid] = useState('');
  const [did, setDid] = useState('');
  const [bid, setBid] = useState('');
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    AlumniServices.getDepartments()
      .then((res) => setDepartments(res.data))
      .catch(() => setDepartments([]));

    AlumniServices.getOrganizations()
      .then((res) => setOrganizations(res.data))
      .catch(() => setOrganizations([]));

    AlumniServices.getBatches()
      .then((res) => setBatches(res.data))
      .catch(() => setBatches([]));
  }, []);

  const validateForm = () => {
    const newErrors = {};

    
    if (!/^[A-Za-z\s]+$/.test(name.trim())) {
      newErrors.name = 'Name must contain only letters and spaces.';
    }

   
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format.';
    }

    
    if (!/^\d{10}$/.test(mobileNo)) {
      newErrors.mobileNo = 'Mobile number must be exactly 10 digits.';
    }

    
    if (!uid) newErrors.uid = 'Please select an organization.';
    if (!did) newErrors.did = 'Please select a department.';
    if (!bid) newErrors.bid = 'Please select a batch year.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const alumniData = {
      name,
      email,
      mobileNo,
      isEnablestudent,
      uid,
      did,
      bid,
    };

    axios
      .post('http://localhost:8080/api/createAlumni', alumniData)
      .then(() => {
        setMessage('✅ Alumni added successfully');
       
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      })
      .catch((error) => {
        const errorMsg =
          error.response?.data?.message || '❌ Failed to add alumni';
        setMessage(`❌ ${errorMsg}`);
        
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      });
  };

  return (
    <div className="container">
      <div className="text-center position-relative">
        <h2 className="fw-bold">Add Alumni Form</h2>
        <IoMdCloseCircle
          size={30}
          className="position-absolute"
          style={{ top: 0, right: 0, cursor: 'pointer', color: '#dc3545' }}
          onClick={() => navigate('/admin-dashboard')}
        />
      </div>

      {message && (
        <Alert
          variant={message.startsWith('✅') ? 'success' : 'danger'}
          className="mt-3 text-center"
        >
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="mt-3">
      
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!errors.name}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

       
        <div className="d-flex justify-content-between">
          <Form.Group className="mb-3" style={{ flexBasis: '48%' }} controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" style={{ flexBasis: '48%' }} controlId="formMobileNo">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Mobile Number"
              value={mobileNo}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d{0,10}$/.test(input)) setMobileNo(input);
              }}
              isInvalid={!!errors.mobileNo}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.mobileNo}
            </Form.Control.Feedback>
          </Form.Group>
        </div>

       
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label>Enable Alumni</Form.Label>
            <Form.Select
              value={isEnablestudent}
              onChange={(e) => setIsEnablestudent(e.target.value)}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Label>Organization</Form.Label>
            <Form.Select
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              isInvalid={!!errors.uid}
              required
            >
              <option value="">Select Organization</option>
              {organizations.map((org, index) => (
                <option key={org.uid || index} value={org.uid}>
                  {org.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.uid}
            </Form.Control.Feedback>
          </Col>

          <Col md={3}>
            <Form.Label>Department</Form.Label>
            <Form.Select
              value={did}
              onChange={(e) => setDid(e.target.value)}
              isInvalid={!!errors.did}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={dept.did || index} value={dept.did}>
                  {dept.dname}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.did}
            </Form.Control.Feedback>
          </Col>

          <Col md={3}>
            <Form.Label>Batch Year</Form.Label>
            <Form.Select
              value={bid}
              onChange={(e) => setBid(e.target.value)}
              isInvalid={!!errors.bid}
              required
            >
              <option value="">Select Batch</option>
              {batches.map((batch, index) => (
                <option key={batch.bid || index} value={batch.bid}>
                  {batch.batchyear}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.bid}
            </Form.Control.Feedback>
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
