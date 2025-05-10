import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLayerGroup } from 'react-icons/fa';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';  // Import SweetAlert2
import './ManageBatch.css'; // Custom CSS

const ManageBatch = () => {
  const [batches, setBatches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [batchToUpdate, setBatchToUpdate] = useState(null);
  const [updatedBatchYear, setUpdatedBatchYear] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Show 5 batches per page

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/ViewAllBatches');
        const sortedBatches = response.data.sort((a, b) => b.batchyear - a.batchyear);
        setBatches(sortedBatches);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };

    fetchBatches();
  }, []);

  const handleDeleteBatch = async (bid) => {
    // SweetAlert2 for delete confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this batch?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/api/deletebatchById/${bid}`);
          
          Swal.fire(
            'Deleted!',
            'The batch has been deleted.',
            'success'
          );
          setBatches(batches.filter(batch => batch.bid !== bid));
        } catch (error) {
          console.error('Error deleting batch:', error);
          // Show error alert
          Swal.fire(
            'Error!',
            'There was an issue deleting the batch.',
            'error'
          );
        }
      }
    });
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

  
  const totalPages = Math.ceil(batches.length / itemsPerPage);
  const currentBatches = batches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mb-container container">
      <div className="mb-header text-center align-items-center">
        <h3 className="text-center">
          <FaLayerGroup size={28} className="text-primary m-2" />
          Manage Batches
        </h3>
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
              {currentBatches.length === 0 ? (
                <tr>
                  <td colSpan="3" className="mb-empty text-center py-3 text-muted">
                    No batches available
                  </td>
                </tr>
              ) : (
                currentBatches.map((batch, index) => (
                  <tr key={batch.bid || index} className="mb-row">
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
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

      
      <div className="pagination-controls d-flex justify-content-center mt-4">
        <Button
          variant="secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            variant="outline-primary"
            className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          variant="secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

     
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
