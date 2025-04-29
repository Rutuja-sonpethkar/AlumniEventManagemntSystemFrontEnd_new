import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageOrganization.css';

const ManageOrganization = () => {
  const [organizations, setOrganizations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedOrg, setEditedOrg] = useState({
    oid: '',
    name: '',
    email: '',
    phone: '',
    isEnable: 'Yes',
    id: ''  // This is for admin ID
  });

  // Fetch all organizations when the component mounts
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

  // Edit organization click
  const handleEditClick = (org) => {
    setEditingId(org.oid);
    setEditedOrg({ ...org });
  };

  // Handle input change in the form
  const handleInputChange = (e) => {
    setEditedOrg({ ...editedOrg, [e.target.name]: e.target.value });
  };

  // Update organization details
  const handleUpdate = async () => {
    try {
      // Update organization via API
      await axios.put('http://localhost:8080/api/Updateorgnaztion', editedOrg);

      // Update the local state directly
      setOrganizations(prevState =>
        prevState.map(org =>
          org.oid === editedOrg.oid ? { ...org, ...editedOrg } : org
        )
      );

      setEditingId(null); // Close the edit form
    } catch (err) {
      console.error(err);
    }
  };

  // Delete organization using provided API
  const handleDelete = async (uid) => {
    if (window.confirm('Are you sure you want to delete this organization?')) {
      try {
        // Delete organization via the provided API
        await axios.delete(`http://localhost:8080/api/DeleteorgnazationByid/${uid}`);

        // Remove the organization from the local state
        setOrganizations(prevState => prevState.filter(org => org.uid !== uid));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Function to get admin name by ID (now simply returning ID as name)
  const getAdminName = (adminId) => {
    return adminId ? `Admin ${adminId}` : 'No Admin Assigned';
  };

  return (
    <div className="org-container">
      <h3 className="org-title">Manage Organizations</h3>
      <table className="org-table">
        <thead>
          <tr>
            <th className="org-th">Name</th>
            <th className="org-th">Email</th>
            <th className="org-th">Phone</th>
            <th className="org-th">Enabled</th>
            <th className="org-th">Admin</th>
            <th className="org-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((org) => (
            <tr key={org.oid}>
              {editingId === org.oid ? (
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
                    <input
                      className="org-input"
                      name="id"
                      value={editedOrg.id}
                      onChange={handleInputChange}
                    />
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
                  <td>{getAdminName(org.id)}</td> {/* Display admin ID as admin name */}
                  <td>
                    <button
                      className="org-btn org-btn-edit"
                      onClick={() => handleEditClick(org)}
                    >
                      Edit
                    </button>
                    <button
                      className="org-btn org-btn-delete"
                      onClick={() => handleDelete(org.uid)} // Use `uid` for delete
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
