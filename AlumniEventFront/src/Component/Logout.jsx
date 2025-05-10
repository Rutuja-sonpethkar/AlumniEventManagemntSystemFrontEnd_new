import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FiLogOut } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire(
          "Logged out!",
          "You have been successfully logged out.",
          "success"
        );
        navigate("/");
      }
    });
  };

  return (
    <nav className="navbar-container">
      <div className="container-fluid">
        {/* Previous & Next Arrows */}
        <div className="d-flex align-items-center mx-3">
          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate(-1)}
            title="Go Back"
          >
            <FaArrowLeft />
          </button>
          <button
            className="btn btn-outline-light"
            onClick={() => navigate(1)}
            title="Go Forward"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      
        
          <Link to="#" className="nav-link" onClick={handleLogout}>
            <button className="btn btn-link d-flex align-items-center text-bg-danger text-decoration-none">
              <FiLogOut className="me-2" />
              Logout
            </button>
          </Link>
        
      
    </nav>
  );
};

export default Logout;
