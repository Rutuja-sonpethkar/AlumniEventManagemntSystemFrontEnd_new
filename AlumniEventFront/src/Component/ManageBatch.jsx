import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLayerGroup } from 'react-icons/fa';
import { Button, Modal, Form } from 'react-bootstrap';
import './ManageBatch.css'; // Updated CSS

const ManageBatch = () => {
  const [batches, setBatches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [batchToUpdate, setBatchToUpdate] = useState(null);
  const [updatedBatchYear, setUpdatedBatchYear] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/ViewAllBatches');
        setBatches(response.data);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };

    fetchBatches();
  }, []);

  const handleDeleteBatch = async (bid) => {
    try {
      await axios.delete(`http://localhost:8080/api/deletebyid/${bid}`);
      setBatches(batches.filter(batch => batch.bid !== bid));
    } catch (error) {
      console.error('Error deleting batch:', error);
    }
  };

  const handleUpdateBatch = async () => {
    try {
      const response = await axios.put('http://localhost:8080/api/Updatebatch', {
        bid: batchToUpdate.bid,
        batchyear: updatedBatchYear
      });

      if (response.status === 200) {
        setBatches(batches.map(batch =>
          batch.bid === batchToUpdate.bid ? { ...batch, batchyear: updatedBatchYear } : batch
        ));
        setIsEditable(false);
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error updating batch:', error);
    }
  };

  return (
    <div className="mb-container container mt-5">
      <div className="mb-header d-flex align-items-center mb-4">
        <FaLayerGroup size={28} className="me-2 text-primary" />
        <h3 className="m-0">Manage Batches</h3>
      </div>

      <div className="mb-card card shadow-sm rounded-4">
        <div className="mb-card-body card-body">
          <table className="mb-table table table-hover table-striped align-middle mb-0">
            <thead className="mb-thead table-primary">
              <tr>
                <th>#</th>
                <th>Batch Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.length === 0 ? (
                <tr>
                  <td colSpan="3" className="mb-empty text-center py-3 text-muted">
                    No batches available
                  </td>
                </tr>
              ) : (
                batches.map((batch, index) => (
                  <tr key={batch.bid || index} className="mb-row">
                    <td>{index + 1}</td>
                    <td>{batch.batchyear}</td>
                    <td className="mb-actions">
                      <Button
                        variant="warning"
                        className="mb-btn-update"
                        onClick={() => {
                          setBatchToUpdate(batch);
                          setUpdatedBatchYear(batch.batchyear);
                          setIsEditable(true);
                          setShowModal(true);
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        className="mb-btn-delete ms-2"
                        onClick={() => handleDeleteBatch(batch.bid)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Batch</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mb-modal-body">
          <Form>
            <Form.Group className="mb-form-group mb-3" controlId="formBatchYear">
              <Form.Label>Batch Year</Form.Label>
              <Form.Control
                className="mb-input"
                type="text"
                value={updatedBatchYear}
                onChange={(e) => setUpdatedBatchYear(e.target.value)}
                disabled={!isEditable}
                required
              />
            </Form.Group>
            <div className="mb-modal-btn-wrapper d-flex justify-content-center">
              <Button variant="primary" onClick={handleUpdateBatch}>Update</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageBatch;
