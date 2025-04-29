import { useState, useEffect } from "react";
import AlumniServices from "../Service/AlumniServices";
import axios from "axios";
import "./ManageAlumni.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';



function ManageAlumni() {
  const [alumniList, setAlumniList] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [editableAlumni, setEditableAlumni] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    AlumniServices.getDepartments().then(res => setDepartments(res.data));
    AlumniServices.getOrganizations().then(res => setOrganizations(res.data));
    AlumniServices.getBatches().then(res => setBatches(res.data));
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/viewAllAlumni");
      setAlumniList(response.data);
    } catch (error) {
      console.error("Error fetching alumni:", error);
    }
  };

  const handleSearch = () => {
    return searchName
      ? alumniList.filter((alumni) =>
          alumni.name.toLowerCase().includes(searchName.toLowerCase())
        )
      : alumniList;
  };

  const handleDelete = async (sid) => {
    if (window.confirm("Are you sure you want to delete this alumni?")) {
      try {
        await axios.delete(`http://localhost:8080/api/deleteAlumnibyId/${sid}`);
        setAlumniList(alumniList.filter((a) => a.sid !== sid));
      } catch (error) {
        console.error("Error deleting alumni:", error);
      }
    }
  };

  const handleEdit = (alumni) => {
    setEditableAlumni({ ...alumni });
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:8080/api/updateAlumni", editableAlumni);

      setAlumniList((prevList) =>
        prevList.map((a) =>
          a.sid === editableAlumni.sid ? { ...editableAlumni } : a
        )
      );

      setEditableAlumni(null);
      setSuccessMessage("Alumni updated successfully!");
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const getOrganizationName = (uid) =>
    organizations.find((o) => o.uid === uid)?.name || "Unknown";

  const getDepartmentName = (did) =>
    departments.find((d) => d.did === did)?.dname || "Unknown";

  const getBatchYear = (bid) =>
    batches.find((b) => b.bid === bid)?.batchyear || "Unknown";

  return (
    <div className="alumni-container">
      <h2>Manage Alumni</h2>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <input
        type="text"
        placeholder="Search by Name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="search-input"
      />

      <table className="alumni-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Mobile No</th>
            <th>Enable</th><th>Org</th><th>Dept</th><th>Batch</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {handleSearch().map((a) => (
            <tr key={a.sid}>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{a.mobileNo}</td>
              <td>{a.isEnablestudent}</td>
              <td>{getOrganizationName(a.uid)}</td>
              <td>{getDepartmentName(a.did)}</td>
              <td>{getBatchYear(a.bid)}</td>
              <td>
              <button className="btn btn-primary me-2" onClick={() => handleEdit(a)}>
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button className="btn btn-danger" onClick={() => handleDelete(a.sid)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editableAlumni && (
        <div className="edit-form">
          <h3>Edit Alumni</h3>
          <input
            type="text"
            value={editableAlumni.name}
            onChange={(e) => setEditableAlumni({ ...editableAlumni, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="email"
            value={editableAlumni.email}
            onChange={(e) => setEditableAlumni({ ...editableAlumni, email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="text"
            value={editableAlumni.mobileNo}
            onChange={(e) => setEditableAlumni({ ...editableAlumni, mobileNo: e.target.value })}
            placeholder="Mobile No"
          />
          <select
            value={editableAlumni.isEnableAlumni}
            onChange={(e) => setEditableAlumni({ ...editableAlumni, isEnableAlumni: e.target.value })}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <select
            value={editableAlumni.uid}
            onChange={(e) => setEditableAlumni({ ...editableAlumni, uid: parseInt(e.target.value) })}
          >
            {organizations.map((o) => (
              <option key={o.uid} value={o.uid}>{o.name}</option>
            ))}
          </select>
          <select
            value={editableAlumni.did}
            onChange={(e) => setEditableAlumni({ ...editableAlumni, did: parseInt(e.target.value) })}
          >
            {departments.map((d) => (
              <option key={d.did} value={d.did}>{d.dname}</option>
            ))}
          </select>
          <select
            value={editableAlumni.bid}
            onChange={(e) => setEditableAlumni({ ...editableAlumni, bid: parseInt(e.target.value) })}
          >
            {batches.map((b) => (
              <option key={b.bid} value={b.bid}>{b.batchyear}</option>
            ))}
          </select>
          <button className="btn btn-success me-2" onClick={handleUpdate}>
            <i className="fas fa-save"></i> Update
          </button>
          <button className="btn btn-secondary" onClick={() => setEditableAlumni(null)}>
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default ManageAlumni;
