import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageDepartment.css'; 

const ManageDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Show 4 departments per page

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    axios.get('http://localhost:8080/api/ViewAllDepartemnt')
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      });
  };

  const handleDelete = (did) => {
    axios.delete(`http://localhost:8080/api/deleteDepartmentById/${did}`)
      .then(() => {
        setDepartments(departments.filter(dept => dept.did !== did));
      })
      .catch(error => {
        console.error('Error deleting department:', error);
      });
  };

  const handleEdit = (dept) => {
    setEditingId(dept.did);
    setEditedName(dept.dname);
  };

  const handleUpdate = (did) => {
    axios.put('http://localhost:8080/api/Updatedepartment', {
      did: did,
      dname: editedName
    })
      .then(() => {
        setDepartments(departments.map(dept =>
          dept.did === did ? { ...dept, dname: editedName } : dept
        ));
        setEditingId(null);
        setEditedName('');
      })
      .catch(error => {
        console.error('Error updating department:', error);
      });
  };

  const filteredDepartments = departments.filter(dep =>
    dep.dname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);
  const currentDepartments = filteredDepartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="md-container">
      <h2 className="md-page-title">Manage Departments</h2>

      <input
        type="text"
        placeholder="Search by department name"
        className="md-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="md-department-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentDepartments.map((dept) => (
            <tr key={dept.did}>
              <td>{dept.did}</td>
              <td>
                {editingId === dept.did ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="md-input-edit"
                  />
                ) : (
                  dept.dname
                )}
              </td>
              <td className="md-actions">
                {editingId === dept.did ? (
                  <>
                    <button className="md-btn md-btn-success" onClick={() => handleUpdate(dept.did)}>Save</button>
                    <button className="md-btn md-btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="md-btn md-btn-warning" onClick={() => handleEdit(dept)}>Edit</button>
                    <button className="md-btn md-btn-danger" onClick={() => handleDelete(dept.did)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageDepartment;
