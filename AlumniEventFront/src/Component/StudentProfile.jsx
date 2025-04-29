import { useState, useEffect } from "react";
import AlumniServices from "../Service/AlumniServices";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import "./Studentprofile.css";

function StudentProfile() {
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

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:8080/api/updateAlumni", editableAlumni);
      setAlumniList(prev => prev.map(a => a.sid === editableAlumni.sid ? editableAlumni : a));
      setEditableAlumni(null);
      setSuccessMessage("Alumni updated successfully!");
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (error) {
      console.error("Error updating alumni:", error);
    }
  };

  const handleEdit = (alumni) => {
    setEditableAlumni({ ...alumni });
  };

  const handleSearch = () => {
    return searchName
      ? alumniList.filter(a => a.name.toLowerCase().includes(searchName.toLowerCase()))
      : alumniList;
  };

  const getOrganizationName = (uid) => organizations.find(o => o.uid === uid)?.name || "Unknown";
  const getDepartmentName = (did) => departments.find(d => d.did === did)?.dname || "Unknown";
  const getBatchYear = (bid) => batches.find(b => b.bid === bid)?.batchyear || "Unknown";

  return (
    <div className="manage-alumni-container">
      <h2 className="manage-alumni-title">Manage Alumni</h2>

      {successMessage && <div className="manage-alumni-success">{successMessage}</div>}

      <input
        type="text"
        placeholder="Search by Name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="manage-alumni-search"
      />

      <table className="manage-alumni-table">
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
              <td>{a.isEnableAlumni}</td>
              <td>{getOrganizationName(a.uid)}</td>
              <td>{getDepartmentName(a.did)}</td>
              <td>{getBatchYear(a.bid)}</td>
              <td>
                <button className="manage-alumni-edit-btn" onClick={() => handleEdit(a)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editableAlumni && (
        <div className="manage-alumni-edit-form">
          <h3 className="manage-alumni-edit-title">Edit Alumni</h3>

          <input
            type="text"
            value={editableAlumni.name}
            onChange={(e) => setEditableAlumni({ ...editableAlumni, name: e.target.value })}
            placeholder="Name"
            className="manage-alumni-input"
          />

          <input
            type="email"
            value={editableAlumni.email}
            onChange={(e) => setEditableAlumni({ ...editableAlumni, email: e.target.value })}
            placeholder="Email"
            className="manage-alumni-input"
          />

          <input
            type="text"
            value={editableAlumni.mobileNo}
            onChange={(e) => setEditableAlumni({ ...editableAlumni, mobileNo: e.target.value })}
            placeholder="Mobile No"
            className="manage-alumni-input"
          />

          <select
            value={editableAlumni.isEnableAlumni}
            onChange={(e) => setEditableAlumni({ ...editableAlumni, isEnableAlumni: e.target.value })}
            className="manage-alumni-select"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            value={editableAlumni.uid}
            onChange={(e) => setEditableAlumni({ ...editableAlumni, uid: parseInt(e.target.value) })}
            className="manage-alumni-select"
          >
            {organizations.map((o) => (
              <option key={o.uid} value={o.uid}>{o.name}</option>
            ))}
          </select>

          <select
            value={editableAlumni.did}
            onChange={(e) => setEditableAlumni({ ...editableAlumni, did: parseInt(e.target.value) })}
            className="manage-alumni-select"
          >
            {departments.map((d) => (
              <option key={d.did} value={d.did}>{d.dname}</option>
            ))}
          </select>

          <select
            value={editableAlumni.bid}
            onChange={(e) => setEditableAlumni({ ...editableAlumni, bid: parseInt(e.target.value) })}
            className="manage-alumni-select"
          >
            {batches.map((b) => (
              <option key={b.bid} value={b.bid}>{b.batchyear}</option>
            ))}
          </select>

          <div className="manage-alumni-btn-group">
            <button className="manage-alumni-save-btn" onClick={handleUpdate}>
              Save
            </button>
            <button className="manage-alumni-cancel-btn" onClick={() => setEditableAlumni(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentProfile;
