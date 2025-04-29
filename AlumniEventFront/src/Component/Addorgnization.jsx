import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IoMdCloseCircle } from 'react-icons/io';
import axios from 'axios';
import AlumniServices from '../Service/AlumniServices';

const AddOrganization = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEnable, setIsEnable] = useState('Yes');
  const [aid, setAid] = useState('');
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const organizationData = {
      name,
      email,
      phone,
      isEnable,
      aid,
    };

    axios.post('http://localhost:8080/api/addnewOrgnazation', organizationData)
      .then((response) => {
        setMessage('✅ Organization added successfully');
        setTimeout(() => navigate('/admin-dashboard'), 1500);
      })
      .catch((error) => {
        console.error('Error:', error.response?.data || error);
        setMessage('❌ Failed to add organization');
      });
  };

  useEffect(() => {
    AlumniServices.getAdmins()
      .then((res) => {
        setAdmins(res.data);
      })
      .catch((err) => {
        setAdmins([]);
      });
  }, []);

  return (
    <div className="ao-container">
      <div className="ao-text-center position-relative">
        <h2 className="ao-fw-bold">Add Organization Form</h2>
        <IoMdCloseCircle
          size={30}
          className="ao-position-absolute ao-close-icon-left"
          onClick={() => navigate('/admin-dashboard')}
        />
      </div>

      {/* Show status message if exists */}
      {message && (
        <Alert variant={message.startsWith('✅') ? 'success' : 'danger'} className="ao-alert ao-mt-3">
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="ao-form-group" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="ao-input"
            required
          />
        </Form.Group>

        <div className="ao-d-flex ao-mt-2">
          <Form.Group className="ao-form-group" style={{ flexBasis: '48%' }} controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ao-input"
              required
            />
          </Form.Group>

          <Form.Group className="ao-form-group" style={{ flexBasis: '48%' }} controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="ao-input"
              required
            />
          </Form.Group>
        </div>

        <div className="ao-admin-enable-container">
          <Form.Group className="ao-form-group" controlId="formEnable">
            <Form.Label>Enable Organization</Form.Label>
            <Form.Select
              value={isEnable}
              onChange={(e) => setIsEnable(e.target.value)}
              className="ao-select"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="ao-form-group" controlId="formAdmin">
            <Form.Label>Admin</Form.Label>
            <Form.Select value={aid} onChange={(e) => setAid(e.target.value)} required className="ao-select">
              <option value="">Select Admin</option>
              {admins.map((admin, index) => (
                <option key={admin.id || index} value={admin.id}>
                  {admin.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
<br></br>
        <div className="ao-d-flex ao-justify-content-center ao-mt-3">
          <Button variant="primary" type="submit" className="ao-btn-lg ao-button-width">
            Add Organization
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddOrganization;
