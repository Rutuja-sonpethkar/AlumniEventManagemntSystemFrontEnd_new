import { useState, useEffect } from "react";
import AlumniServices from "../Service/AlumniServices";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import "./Studentprofile.css"; 

function StudentProfile() {
  const [alumniData, setAlumniData] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [editableAlumni, setEditableAlumni] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    AlumniServices.getDepartments().then(res => setDepartments(res.data));
    AlumniServices.getOrganizations().then(res => setOrganizations(res.data));
    AlumniServices.getBatches().then(res => setBatches(res.data));

    const storedStudent = JSON.parse(localStorage.getItem("student"));
    if (storedStudent) {
      fetchStudentProfile(storedStudent.sid);
    }
  }, []);

  const fetchStudentProfile = async (sid) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/alumnidata/${sid}`);
      setAlumniData(response.data[0]);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:8080/api/updateAlumni", editableAlumni);
      setAlumniData(editableAlumni);
      setEditableAlumni(null);
      setIsEditing(false);
      setSuccessMessage("Alumni updated successfully!");
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (error) {
      console.error("Error updating alumni:", error);
    }
  };

  const handleEdit = () => {
    setEditableAlumni({ ...alumniData });
    setIsEditing(true);
  };

  const getOrganizationName = (uid) => organizations.find(o => o.uid === uid)?.name || "Unknown";
  const getDepartmentName = (did) => departments.find(d => d.did === did)?.dname || "Unknown";
  const getBatchYear = (bid) => batches.find(b => b.bid === bid)?.batchyear || "Unknown";

  if (!alumniData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">Student Profile</h2>

      {successMessage && <div className="profile-success">{successMessage}</div>}

      <div className="profile-card">
        {!isEditing ? (
          <div className="profile-details">
            <div className="profile-section">
              <strong>Student ID:</strong>
              <span>{alumniData?.sid || "SID not available"}</span>
            </div>
            <div className="profile-section">
              <strong>Student Name:</strong>
              <span>{alumniData?.name || "Name not available"}</span>
            </div>
            <div className="profile-section">
              <strong>Email:</strong>
              <span>{alumniData?.email || "Email not available"}</span>
            </div>
            <div className="profile-section">
              <strong>Mobile No:</strong>
              <span>{alumniData?.mobileNo || "Mobile number not available"}</span>
            </div>
            <div className="profile-section">
              <strong>Enable:</strong>
              <span>{(alumniData.isEnableAlumni!='Yes')?"Yes":"No"}</span>
            </div>
            <div className="profile-section">
              <strong>Organization:</strong>
              <span>{getOrganizationName(alumniData?.uid)}</span>
            </div>
            <div className="profile-section">
              <strong>Department:</strong>
              <span>{getDepartmentName(alumniData?.did)}</span>
            </div>
            <div className="profile-section">
              <strong>Batch Year:</strong>
              <span>{getBatchYear(alumniData?.bid)}</span>
            </div>
          </div>
        ) : (
          <div className="profile-edit-form">
            <h3>Edit Profile</h3>

            <input
              type="text"
              value={editableAlumni.sid}
              disabled
              readOnly
              className="profile-input"
              placeholder="SID"
            />

            <input
              type="text"
              value={editableAlumni.name}
              onChange={(e) => setEditableAlumni({ ...editableAlumni, name: e.target.value })}
              placeholder="Name"
              className="profile-input"
            />

            <input
              type="email"
              value={editableAlumni.email}
              onChange={(e) => setEditableAlumni({ ...editableAlumni, email: e.target.value })}
              placeholder="Email"
              className="profile-input"
            />

            <input
              type="text"
              value={editableAlumni.mobileNo}
              onChange={(e) => setEditableAlumni({ ...editableAlumni, mobileNo: e.target.value })}
              placeholder="Mobile No"
              className="profile-input"
            />

            <select
              value={editableAlumni.isEnableAlumni}
              onChange={(e) => setEditableAlumni({ ...editableAlumni, isEnableAlumni: e.target.value })}
              className="profile-select"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <select
              value={editableAlumni.uid}
              onChange={(e) => setEditableAlumni({ ...editableAlumni, uid: parseInt(e.target.value) })}
              className="profile-select"
            >
              {organizations.map((o) => (
                <option key={o.uid} value={o.uid}>{o.name}</option>
              ))}
            </select>

            <select
              value={editableAlumni.did}
              onChange={(e) => setEditableAlumni({ ...editableAlumni, did: parseInt(e.target.value) })}
              className="profile-select"
            >
              {departments.map((d) => (
                <option key={d.did} value={d.did}>{d.dname}</option>
              ))}
            </select>

            <select
              value={editableAlumni.bid}
              onChange={(e) => setEditableAlumni({ ...editableAlumni, bid: parseInt(e.target.value) })}
              className="profile-select"
            >
              {batches.map((b) => (
                <option key={b.bid} value={b.bid}>{b.batchyear}</option>
              ))}
            </select>

            <div className="profile-btn-group">
              <button className="profile-save-btn" onClick={handleUpdate}>Save</button>
              <button className="profile-cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        )}

        {!isEditing && (
          <button className="profile-edit-btn" onClick={handleEdit}>
            <FontAwesomeIcon icon={faEdit} /> Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default StudentProfile;
