import React from "react";
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <h1 className="navbar-title">Alumni Management System</h1>
      </div>

      <ul className="navbar-right">
        <li className="nav-item"><a href="#home" className="nav-link">Home</a></li>
        <li className="nav-item"><a href="#about" className="nav-link">About</a></li>
        <li className="nav-item"><a href="#gallery" className="nav-link">Gallery</a></li>
        {/* <li className="nav-item"><a href="#jobs" className="nav-link">Jobs</a></li> */}
        <li className="nav-item"><a href="#events" className="nav-link">Events</a></li>
        <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
