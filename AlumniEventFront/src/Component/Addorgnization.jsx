import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IoMdCloseCircle } from 'react-icons/io';
import axios from 'axios';
import AlumniServices from '../Service/AlumniServices';
import './Addorgnization.css';

const AddOrganization = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEnable, setIsEnable] = useState('Yes');
  const [aid, setAid] = useState('');
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    AlumniServices.getAdmins()
      .then((res) => {
        setAdmins(res.data);
      })
      .catch(() => {
        setAdmins([]);
      });
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(name.trim())) {
      newErrors.name = 'Name must contain only letters and spaces';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Invalid email format';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone.trim())) {
      newErrors.phone = 'Phone must be exactly 10 digits';
    }

    if (!aid) {
      newErrors.aid = 'Admin selection is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const organizationData = {
      name,
      email,
      phone,
      isEnable,
      aid,
    };

    axios.post('http://localhost:8080/api/addnewOrgnazation', organizationData)
      .then(() => {
        setMessage('✅ Organization added successfully');
        setTimeout(() => navigate('/admin-dashboard'), 1500);
      })
      .catch((error) => {
        console.error('Error:', error.response?.data || error);
        setMessage('❌ Failed to add organization');
      });
  };

  return (
    <div className="organization-container">
      <div className="form-header">
        <h2 className="form-title">Add Organization</h2>
        <IoMdCloseCircle
          size={30}
          className="close-icon"
          onClick={() => navigate('/admin-dashboard')}
        />
      </div>

      {message && (
        <Alert variant={message.startsWith('✅') ? 'success' : 'danger'} className="message-alert">
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group" controlId="formName" >
          <Form.Label>Organization Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Organization Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        <div className="form-group-container">
          <Form.Group className="form-group" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="form-group" controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter Phone"
              value={phone}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) { // Allow only up to 10 digits
                  setPhone(value);
                }
              }}
              className="form-input"
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className="form-toggle-container">
          <Form.Group className="form-group" controlId="formEnable">
            <Form.Label>Enable Organization</Form.Label>
            <Form.Select
              value={isEnable}
              onChange={(e) => setIsEnable(e.target.value)}
              className="form-select"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="form-group" controlId="formAdmin">
            <Form.Label>Admin</Form.Label>
            <Form.Select
              value={aid}
              onChange={(e) => setAid(e.target.value)}
              className="form-select"
              isInvalid={!!errors.aid}
            >
              <option value="">Select Admin</option>
              {admins.map((admin, index) => (
                <option key={admin.id || index} value={admin.id}>
                  {admin.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.aid}</Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className="form-submit-container">
          <Button variant="primary" type="submit" className="submit-btn">
            Add Organization
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddOrganization;
