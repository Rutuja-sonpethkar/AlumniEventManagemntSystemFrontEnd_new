import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to navigate to different pages

  // Static admin credentials
  const adminCredentials = {
    email: "admin@gmail.com",  // Example admin email
    mobileNo: "admin",    // Example admin mobile number
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email and mobile number are provided
    if (!email || !mobileNo) {
      setError("Please enter both email and mobile number.");
      return;
    }

    // Check if the entered credentials match the admin credentials
    if (email === adminCredentials.email && mobileNo === adminCredentials.mobileNo) {
      // If admin credentials match, navigate to the admin dashboard
      navigate("/admin-dashboard");
    } else {
      try {
        // Make an API call to check if the student is registered
        const response = await fetch("http://localhost:8080/api/viewAllAlumni");
        const alumniData = await response.json();

        // Check if any alumni matches the email and mobile number
        const student = alumniData.find(alumni => alumni.email === email && alumni.mobileNo === mobileNo);

        if (student) {
          // If student exists, navigate to the student dashboard
          navigate("/student-dashboard");
        } else {
          setError("Student not registered or incorrect mobile number!");
        }
      } catch (error) {
        console.error("Error during login:", error);
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Username (Email)</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="mobileNo">Password (Mobile Number)</label>
          <input
            type="password"  // Password field to hide the mobile number
            id="mobileNo"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
