import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './ManageOrganization.css';

const ManageOrganization = () => {
  const [organizations, setOrganizations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedOrg, setEditedOrg] = useState({
    uid: '',
    name: '',
    email: '',
    phone: '',
    isEnable: 'Yes',
    id: ''  // Still included for backend updates, just not shown
  });

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const orgResponse = await axios.get('http://localhost:8080/api/viewAllOrgnzation');
        setOrganizations(orgResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrganizations();
  }, []);

  const handleEditClick = (org) => {
    setEditingId(org.uid);
    setEditedOrg({ ...org });
  };

  const handleInputChange = (e) => {
    setEditedOrg({ ...editedOrg, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put('http://localhost:8080/api/Updateorgnaztion', editedOrg);
      setOrganizations(prevState =>
        prevState.map(org =>
          org.uid === editedOrg.uid ? { ...org, ...editedOrg } : org
        )
      );
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (uid) => {
    // SweetAlert2 for delete confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this organization?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/api/DeleteorgnazationByid/${uid}`);
          // Show success alert
          Swal.fire(
            'Deleted!',
            'The organization has been deleted.',
            'success'
          );
          setOrganizations(prevState => prevState.filter(org => org.uid !== uid));
        } catch (err) {
          console.error(err);
          // Show error alert
          Swal.fire(
            'Error!',
            'There was an issue deleting the organization.',
            'error'
          );
        }
      }
    });
  };

  return (
    <div className="org-container" style={{ width: '100%' }}>
      <h3 className="org-title">Manage Organizations</h3>
      <table className="org-table">
        <thead>
          <tr>
            <th className="org-th">Name</th>
            <th className="org-th">Email</th>
            <th className="org-th">Phone</th>
            <th className="org-th">Enabled</th>
            <th className="org-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((org) => (
            <tr key={org.uid}>
              {editingId === org.uid ? (
                <>
                  <td>
                    <input
                      className="org-input"
                      name="name"
                      value={editedOrg.name}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      className="org-input"
                      name="email"
                      value={editedOrg.email}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      className="org-input"
                      name="phone"
                      value={editedOrg.phone}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <select
                      className="org-select"
                      name="isEnable"
                      value={editedOrg.isEnable}
                      onChange={handleInputChange}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                  <td>
                    <button className="org-btn org-btn-save" onClick={handleUpdate}>
                      Save
                    </button>
                    <button
                      className="org-btn org-btn-cancel"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{org.name}</td>
                  <td>{org.email}</td>
                  <td>{org.phone}</td>
                  <td>{org.isEnable}</td>
                  <td>
                    <button
                      className="org-btn org-btn-edit"
                      onClick={() => handleEditClick(org)}
                    >
                      Edit
                    </button>
                    <button
                      className="org-btn org-btn-delete"
                      onClick={() => handleDelete(org.uid)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrganization;
