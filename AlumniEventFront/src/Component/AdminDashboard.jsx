import React, { useState } from "react";
import "./AdminDashboard.css";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom"; // useNavigate for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserPlus,
  faEdit,
  faCalendar,
  faCakeCandles,
  faBriefcase,
  faBuilding,
  faGraduationCap,
  faUsers,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

import AddAlumni from "./AddAlumni"; // Your actual component
import ManageAlumni from "./ManageAlumni";
import AddEvent from "./AddEvent";
import ManageEvents from "./ManageEvents";
import Navbar from "./Navbar";
import ToBatch from "./ToBatch";
import AddOrganizationForm from "./Addorgnization";
import AddDepartment from "./AddDepartment";
import ManageDepartment from "./ManageDepartment";
import AddBatch from "./AddBatch";
import ManageBatch from "./ManageBatch";
import AddJob from "./AddJob";
import ManageJob from "./ManageJob";
import ToStudent from "./ToStudent";
import ViewAssignevents from "./ViewAssignevents";
import ManageOrganization from "./ManageOrganization";
import Logout from "./Logout";
import ManageFeedback from "./Managefeedback";


const Placeholder = ({ title }) => <h3 style={{ padding: "20px" }}>{title}</h3>;

const AdminDashboard = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate(); 
  const toggleDropdown = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  
  const handleLogout = () => {
   
    localStorage.removeItem("authToken"); 
    navigate("/"); 
  };

  return (
    <>
   
    <Logout/>
      <div className="admin-dashboard container-fluid">
        <aside className="admin-sidebar">
          <h4 className="sidebar-title">Admin Panel</h4>
          <nav className="sidebar-nav">
          
            <div className="dropdown-section">
              <div
                className="sidebar-link"
                onClick={() => toggleDropdown("alumni")}
              >
                <FontAwesomeIcon icon={faUser} className="me-2" /> Alumni ▾
              </div>
              <div
                className={`dropdown-links ${
                  openDropdown === "alumni" ? "active" : ""
                }`}
              >
                <NavLink
                  to="/admin-dashboard/add-alumni"
                  className="sidebar-sub-link"
                >
                  <FontAwesomeIcon icon={faUserPlus} className="me-2" /> Add
                </NavLink>
                <NavLink
                  to="/admin-dashboard/managealumni"
                  className="sidebar-sub-link"
                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Manage
                </NavLink>
              </div>
            </div>

           
            <div className="dropdown-section">
              <div
                className="sidebar-link"
                onClick={() => toggleDropdown("events")}
              >
                <FontAwesomeIcon icon={faCalendar} className="me-2" /> Events ▾
              </div>
              <div
                className={`dropdown-links ${
                  openDropdown === "events" ? "active" : ""
                }`}
              >
                <NavLink
                  to="/admin-dashboard/addevent"
                  className="sidebar-sub-link"
                >
                  <FontAwesomeIcon icon={faCakeCandles} className="me-2" /> Add
                  Events
                </NavLink>
                <NavLink
                  to="/admin-dashboard/manageevent"
                  className="sidebar-sub-link"
                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Manage
                  Events
                </NavLink>
              </div>
            </div>

           
            <div className="dropdown-section">
              <div
                className="sidebar-link"
                onClick={() => toggleDropdown("assignEvent")}
              >
                <FontAwesomeIcon icon={faCalendar} className="me-2" /> Assign
                Event ▾
              </div>
              <div
                className={`dropdown-links ${
                  openDropdown === "assignEvent" ? "active" : ""
                }`}
              >
                <NavLink
                  to="/admin-dashboard/assign-event-batch"
                  className="sidebar-sub-link"
                >
                  <FontAwesomeIcon icon={faUsers} className="me-2" /> To Batch
                </NavLink>
                <NavLink
                  to="/admin-dashboard/assign-event-student"
                  className="sidebar-sub-link"
                >
                  <FontAwesomeIcon icon={faUser} className="me-2" /> To Student
                </NavLink>
                <NavLink
                  to="/admin-dashboard/view-assigen-event"
                  className="sidebar-sub-link"
                >
                  <FontAwesomeIcon icon={faUser} className="me-2" /> View
                  Assignevent
                </NavLink>
              </div>
            </div>

           
            <div className="dropdown-section">
              <div
                className="sidebar-link"
                onClick={() => toggleDropdown("organization")}
              >
                <FontAwesomeIcon icon={faBuilding} className="me-2" />{" "}
                Organization ▾
              </div>
              <div
                className={`dropdown-links ${
                  openDropdown === "organization" ? "active" : ""
                }`}
              >
                <NavLink
                  to="/admin-dashboard/add-organization"
                  className="sidebar-sub-link"
                >
                  <FontAwesomeIcon icon={faUserPlus} className="me-2" /> Add
                </NavLink>
                <NavLink
                  to="/admin-dashboard/manage-organization"
                  className="sidebar-sub-link"
                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Manage
                </NavLink>
              </div>
            </div>

           
            <div className="dropdown-section">
              <div
                className="sidebar-link"
                onClick={() => toggleDropdown("department")}
              >
                <FontAwesomeIcon icon={faGraduationCap} className="me-2" />{" "}
                Department ▾
              </div>
              <div
                className={`dropdown-links ${
                  openDropdown === "department" ? "active" : ""
                }`}
              >
                <NavLink
                  to="/admin-dashboard/add-department"
                  className="sidebar-sub-link"
                >
                  <FontAwesomeIcon icon={faUserPlus} className="me-2" /> Add
                </NavLink>
                <NavLink
                  to="/admin-dashboard/manage-department"
                  className="sidebar-sub-link"
                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Manage
                </NavLink>
              </div>
            </div>

           
            <div className="dropdown-section">
              <div
                className="sidebar-link"
                onClick={() => toggleDropdown("batch")}
              >
                <FontAwesomeIcon icon={faGraduationCap} className="me-2" />{" "}
                Batch ▾
              </div>
              <div
                className={`dropdown-links ${
                  openDropdown === "batch" ? "active" : ""
                }`}
              >
                <NavLink
                  to="/admin-dashboard/add-batch"
                  className="sidebar-sub-link"
                >
                  <FontAwesomeIcon icon={faUserPlus} className="me-2" /> Add
                </NavLink>
                <NavLink
                  to="/admin-dashboard/manage-batch"
                  className="sidebar-sub-link"
                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Manage
                </NavLink>
              </div>
            </div>

            {/* Jobs Section */}
            {/* <div className="dropdown-section">
              <div
                className="sidebar-link"
                onClick={() => toggleDropdown("job")}
              >
                <FontAwesomeIcon icon={faBriefcase} className="me-2" /> Jobs ▾
              </div>
              <div
                className={`dropdown-links ${
                  openDropdown === "job" ? "active" : ""
                }`}
              >
                <NavLink
                  to="/admin-dashboard/add-job"
                  className="sidebar-sub-link"
                >
                  <FontAwesomeIcon icon={faUserPlus} className="me-2" /> Add
                </NavLink>
                <NavLink
                  to="/admin-dashboard/manage-job"
                  className="sidebar-sub-link"
                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Manage
                </NavLink>
              </div>
            </div> */}

            {/* Logout Button */}
            {/* <div className="sidebar-link" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
            </div> */}
            {/* Feedback Section */}
<div className="dropdown-section">
  <div
    className="sidebar-link"
    onClick={() => toggleDropdown("feedback")}
  >
    <FontAwesomeIcon icon={faUsers} className="me-2" /> Feedback ▾
  </div>
  <div
    className={`dropdown-links ${
      openDropdown === "feedback" ? "active" : ""
    }`}
  >
    <NavLink
      to="/admin-dashboard/viewallfeedback"
      className="sidebar-sub-link"
    >
      <FontAwesomeIcon icon={faEdit} className="me-2" /> View All Feedback
    </NavLink>
  </div>
</div>

            
          </nav>
        </aside>

        <main className="admin-content">
          <Routes>
           
            <Route
              path=""
              element={
                <div className="p-4">
                  <div className="card shadow rounded-4 p-4 bg-light">
                    <h2 className="mb-2 fw-bold text-primary">
                      Welcome, Admin!
                    </h2>
                    <p className="text-muted mb-4">
                      Manage your alumni network efficiently and powerfully.
                    </p>
                    <div className="row g-4">
                      <div className="col-md-4">
                        <div className="card text-white bg-primary shadow rounded-3 p-3">
                          <h5 className="card-title">Total Alumni</h5>
                          <p className="card-text fs-4">1,205</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card text-white bg-success shadow rounded-3 p-3">
                          <h5 className="card-title">Upcoming Events</h5>
                          <p className="card-text fs-4">12</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card text-white bg-warning shadow rounded-3 p-3">
                          <h5 className="card-title">Job Listings</h5>
                          <p className="card-text fs-4">45</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5">
                      <p className="text-secondary">
                        Use the sidebar to start adding alumni, organizing
                        events, or posting jobs. You’re in control!
                      </p>
                    </div>
                  </div>
                </div>
              }
            />

            <Route path="add-alumni" element={<AddAlumni />} />
            <Route path="managealumni" element={<ManageAlumni />} />
            <Route path="addevent" element={<AddEvent />} />
            <Route path="manageevent" element={<ManageEvents />} />
            <Route path="assign-event-batch" element={<ToBatch />} />
            <Route path="assign-event-student" element={<ToStudent />} />
            <Route path="view-assigen-event" element={<ViewAssignevents />} />
            <Route path="add-organization" element={<AddOrganizationForm />} />
            <Route path="manage-organization" element={<ManageOrganization />}/>
            <Route path="add-department" element={<AddDepartment />} />
            <Route path="manage-department" element={<ManageDepartment />} />
            <Route path="Add-batch" element={<AddBatch />} />
            <Route path="manage-batch" element={<ManageBatch />} />
            <Route path="add-job" element={<AddJob />} />
            <Route path="manage-job" element={<ManageJob />} />
            <Route path="viewallfeedback" element={<ManageFeedback/>}/>
          </Routes>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
