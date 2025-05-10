import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import Navbar from "./Navbar";
function Login() {
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const adminCredentials = {
    email: "admin@gmail.com",
    mobileNo: "admin",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !mobileNo) {
      setError("Please enter both email and mobile number.");
      return;
    }

    // Admin login logic
    if (email === adminCredentials.email && mobileNo === adminCredentials.mobileNo) {
      navigate("/admin-dashboard");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/viewAllAlumni");
      const alumniData = await response.json();
      console.log("Alumni Data:", alumniData);  // Check if the data is fetched correctly

      // Log the entered credentials for debugging
      console.log("Entered Email: ", email);
      console.log("Entered MobileNo: ", mobileNo);

      // Match email and mobileNo
      const student = alumniData.find(
        (alumni) =>
          alumni.email.trim().toLowerCase() === email.trim().toLowerCase() &&
          alumni.mobileNo.trim() === mobileNo.trim()
      );

      if (student) {
        // Optionally save student info for later use
        localStorage.setItem("student", JSON.stringify(student));
        navigate("/student-dashboard");
      } else {
        setError("Student not registered or incorrect credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
     <Navbar/>
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
            type="password"
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
    </>
  );
  
}

export default Login;
