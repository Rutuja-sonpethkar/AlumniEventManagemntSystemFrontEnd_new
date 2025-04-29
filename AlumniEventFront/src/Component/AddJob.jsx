import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const AddJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        companyname: '',
        location: '',
        jobtype: '',
        description: '',
        deadline: '',
        sid: '' // alumni ID (as string initially)
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            sid: parseInt(formData.sid, 10) // convert sid to integer
        };

        axios.post('http://localhost:8080/api/AddJob', payload)
            .then(response => {
                if (response.data === true) {
                    alert('✅ Job posted successfully!');
                    setFormData({
                        title: '',
                        companyname: '',
                        location: '',
                        jobtype: '',
                        description: '',
                        deadline: '',
                        sid: ''
                    });
                } else {
                    alert('❌ Failed to post job. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error posting job:', error);
                alert('⚠️ An error occurred while posting the job.');
            });
    };

    return (
        <div className="p-4">
            <h2 className="text-center mb-4">Add Job</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter job title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formCompanyName">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter company name"
                        name="companyname"
                        value={formData.companyname}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter job location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formJobType">
                            <Form.Label>Job Type</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter job type"
                                name="jobtype"
                                value={formData.jobtype}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter job description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDeadline">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formSid">
                    <Form.Label>Alumni ID (sid)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter alumni ID"
                        name="sid"
                        value={formData.sid}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <div className="d-flex justify-content-center mt-4">
                    <Button variant="primary" type="submit" className="w-75">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AddJob;
