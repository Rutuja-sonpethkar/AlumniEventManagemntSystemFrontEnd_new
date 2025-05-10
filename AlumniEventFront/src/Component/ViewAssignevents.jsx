import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAssignevents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/viewassigneventdata');
      console.log(response.data);
      setEvents(response.data); 
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Events and Assigned Students</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Event Name</th>
            <th>Location</th>
            <th>Date</th>
            <th>Assigned Students Count</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event.eid}>
                <td>{event.eid}</td>
                <td>{event.eventname}</td>
                <td>{event.location}</td>
                <td>{event.date}</td>
                <td>{event.assignedStudentCount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No Events Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAssignevents;
