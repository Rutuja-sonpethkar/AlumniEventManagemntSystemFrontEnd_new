import React, { useState } from 'react';
import './StudentDashboard.css';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';  // useNavigate for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faCalendar, faBriefcase, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

import Events from './Events'; // Your Events component
import AddFeedback from './AddFeedback';
import AllEvents from './AllEvents';
import StudentProfile from './StudentProfile';
import Viewfeedback from './Viewfeedback';
import ViewJob from './ViewJob';
import AddJob from './AddJob';


const Placeholder = ({ title }) => <h3 style={{ padding: '20px' }}>{title}</h3>;

const StudentDashboard = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();  // Hook to navigate

  const toggleDropdown = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear any authentication or session data (this will depend on your app's logic)
    localStorage.removeItem('authToken');  // Example: remove auth token from local storage
    navigate('/');  // Redirect to login page
  };

  return (
    <div className="student-dashboard container-fluid">
      <aside className="student-sidebar">
        <h4 className="sidebar-title">Student Panel</h4>
        <nav className="sidebar-nav">

          {/* Profile Section */}
          <div className="dropdown-section">
            <div className="sidebar-link" onClick={() => toggleDropdown('profile')}>
              <FontAwesomeIcon icon={faUser} className="me-2" /> Profile ▾
            </div>
            <div className={`dropdown-links ${openDropdown === 'profile' ? 'active' : ''}`}>
              <NavLink to="/student-dashboard/profile" className="sidebar-sub-link">
                <FontAwesomeIcon icon={faUser} className="me-2" /> View Profile
              </NavLink>
            </div>
          </div>

          {/* Events Section */}
          <div className="dropdown-section">
            <div className="sidebar-link" onClick={() => toggleDropdown('events')}>
              <FontAwesomeIcon icon={faCalendar} className="me-2" /> Events ▾
            </div>
            <div className={`dropdown-links ${openDropdown === 'events' ? 'active' : ''}`}>
              <NavLink to="/student-dashboard/events" className="sidebar-sub-link">
                <FontAwesomeIcon icon={faCalendar} className="me-2" /> Upcoming Events
              </NavLink>
            </div>
          </div>

          {/* Jobs Section */}
          <div className="dropdown-section">
            <div className="sidebar-link" onClick={() => toggleDropdown('jobs')}>
              <FontAwesomeIcon icon={faBriefcase} className="me-2" /> Jobs ▾
            </div>
            <div className={`dropdown-links ${openDropdown === 'jobs' ? 'active' : ''}`}>
              <NavLink to="/student-dashboard/jobs" className="sidebar-sub-link">
                <FontAwesomeIcon icon={faBriefcase} className="me-2" /> Job Opportunities
              </NavLink>
              <NavLink to="/student-dashboard/add-job" className="sidebar-sub-link">
                <FontAwesomeIcon icon={faBriefcase} className="me-2" /> Add Job
              </NavLink>
              <NavLink to="/student-dashboard/manage-job" className="sidebar-sub-link">
                <FontAwesomeIcon icon={faBriefcase} className="me-2" /> Manage Jobs
              </NavLink>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="dropdown-section">
            <div className="sidebar-link" onClick={() => toggleDropdown('feedback')}>
              <FontAwesomeIcon icon={faBriefcase} className="me-2" /> Feedback ▾
            </div>
            <div className={`dropdown-links ${openDropdown === 'feedback' ? 'active' : ''}`}>
              <NavLink to="/student-dashboard/add-feedback" className="sidebar-sub-link">
                <FontAwesomeIcon icon={faBriefcase} className="me-2" /> Add Feedback
              </NavLink>
              <NavLink to="/student-dashboard/manage-feedback" className="sidebar-sub-link">
                <FontAwesomeIcon icon={faBriefcase} className="me-2" /> Manage Feedback
              </NavLink>
            </div>
          </div>

          {/* Logout Button */}
          <div className="sidebar-link" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
          </div>

        </nav>
      </aside>

      <main className="student-content">
        <Routes>
          <Route path='profile' element={<StudentProfile/>}/>
          <Route path='events' element={<AllEvents/>}/>
          <Route path="add-feedback" element={<AddFeedback />} />
          <Route path='manage-feedback' element={<Viewfeedback/>}/>
          <Route path='manage-job' element={< ViewJob/>}/>
          <Route path='add-job' element={<AddJob/>}/>
         
        </Routes>
      </main>
    </div>
  );
};

export default StudentDashboard;
