import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './ManageJob.css'; // Don't forget to create and import this CSS file

const ManageJob = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [jobData, setJobData] = useState({
    jid: '',
    title: '',
    companyname: '',
    location: '',
    jobtype: '',
    description: '',
    deadline: '',
    sid: ''
  });

  // Fetch jobs
  useEffect(() => {
    axios.get('http://localhost:8080/api/ViewAllJob')
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleEditJob = (job) => {
    setJobData(job);
    setShowModal(true);
  };

  const handleJobUpdate = () => {
    axios.put(`http://localhost:8080/api/updatejob`, jobData)
      .then(() => {
        setJobs(jobs.map(job => (job.jid === jobData.jid ? jobData : job)));
        setShowModal(false);
        resetForm();
      })
      .catch(error => console.error('Error updating job:', error));
  };

  const handleJobDelete = (jid) => {
    axios.delete(`http://localhost:8080/api/deletebyid/${jid}`)
      .then(() => setJobs(jobs.filter(job => job.jid !== jid)))
      .catch(error => console.error('Error deleting job:', error));
  };

  const resetForm = () => {
    setJobData({
      jid: '',
      title: '',
      companyname: '',
      location: '',
      jobtype: '',
      description: '',
      deadline: '',
      sid: ''
    });
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Manage Jobs</h3>
      <Row xs={1} md={2} className="g-4">
        {jobs.map((job) => (
          <Col key={job.jid}>
            <Card className="custom-job-card">
              <Card.Body>
                <Card.Title className="text-primary fs-4">{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{job.companyname}</Card.Subtitle>
                <Card.Text>
                  <strong>📍 Location:</strong> {job.location}<br />
                  <strong>🧾 Type:</strong> {job.jobtype}<br />
                  <strong>📅 Deadline:</strong> {job.deadline}<br />
                  <strong>👤 Alumni ID:</strong> {job.sid}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="outline-primary" onClick={() => handleEditJob(job)}>Edit</Button>
                  <Button variant="outline-danger" onClick={() => handleJobDelete(job.jid)}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Edit Job Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Job Title</Form.Label>
              <Form.Control type="text" name="title" value={jobData.title} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" name="companyname" value={jobData.companyname} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" name="location" value={jobData.location} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Job Type</Form.Label>
              <Form.Control type="text" name="jobtype" value={jobData.jobtype} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={jobData.description} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Deadline</Form.Label>
              <Form.Control type="date" name="deadline" value={jobData.deadline} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Alumni ID (SID)</Form.Label>
              <Form.Control type="number" name="sid" value={jobData.sid} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleJobUpdate}>Update Job</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageJob;
