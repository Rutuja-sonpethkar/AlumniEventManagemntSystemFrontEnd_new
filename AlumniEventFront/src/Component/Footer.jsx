import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";


const Footer = () => {
  return (
    <footer className="footer bg-darkpt-5 pb-3">
      <div className="container">
        <div className="row">

          
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Alumni EMS</h5>
            <p>
              Bridging alumni and alma mater through seamless event management and active engagement.
            </p>
          </div>

        
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3 mx-5">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/events" className="footer-link">Events</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

         
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Contact</h5>
            <p>Email: rsml@alumniems.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Rajarshi Shahu College, Latur, India</p>
          </div>
        </div>

        <hr className="border-secondary" />

        <div className="text-center">
          <small>&copy; {new Date().getFullYear()} Alumni EMS. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;