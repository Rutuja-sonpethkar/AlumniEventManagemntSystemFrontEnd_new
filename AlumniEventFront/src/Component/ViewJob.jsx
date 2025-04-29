import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import './ViewJob.css'; // Updated: custom CSS file for this component only

const ViewJob = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobId, setAppliedJobId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/ViewAllJob')
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleApply = (jid) => {
    setAppliedJobId(jid);
    setTimeout(() => {
      setAppliedJobId(null);
    }, 3000);
  };

  return (
    <div className="viewjob-container mt-4">
      <h3 className="viewjob-title mb-4 text-center">Available Jobs</h3>
      <Row xs={1} md={2} className="g-4">
        {jobs.map((job) => (
          <Col key={job.jid}>
            <Card className="viewjob-card">
              <Card.Body>
                <Card.Title className="viewjob-card-title">{job.title}</Card.Title>
                <Card.Subtitle className="viewjob-card-subtitle mb-2 text-muted">{job.companyname}</Card.Subtitle>
                <Card.Text className="viewjob-card-text">
                  <strong>📍 Location:</strong> {job.location}<br />
                  <strong>🧾 Type:</strong> {job.jobtype}<br />
                  <strong>📅 Deadline:</strong> {job.deadline}
                </Card.Text>
                <div className="viewjob-button-container d-flex justify-content-center">
                  <Button variant="success" onClick={() => handleApply(job.jid)}>Apply</Button>
                </div>
                {appliedJobId === job.jid && (
                  <Alert variant="success" className="viewjob-alert mt-3 text-center">
                    Successfully Applied!
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ViewJob;
