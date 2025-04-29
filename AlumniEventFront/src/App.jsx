import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Navbar from './Component/Navbar'
import Home from './Component/Home';
import AboutUs from './Component/AboutUs';
import Gallery from './Component/Gallery';
import Events from './Component/Events';
import Job from './Component/Job';
import Login from './Component/Login';

import AdminDashboard from './Component/AdminDashboard'; // <-- Ensure this is the correct path to AdminDashboard
import StudentDashboard from './Component/StudentDashboard';


function MainPage() {
  return (
    <div className="container-fluid">
      <Navbar />
      <div id="home"><Home /></div>
      <div id="about"><AboutUs /></div>
      <div id="gallery"><Gallery /></div>
      <div id="jobs"><Job /></div>
      <div id="events"><Events /></div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
        <Route path="/student-dashboard/*" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;