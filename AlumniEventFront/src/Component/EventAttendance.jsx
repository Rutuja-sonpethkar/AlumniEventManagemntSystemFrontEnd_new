import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Spinner, Pagination } from 'react-bootstrap';

const EventAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    axios.get('http://localhost:8080/api/attendance')
      .then(response => {
        setAttendanceData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching attendance data:", error);
        setLoading(false);
      });
  }, []);

  // Pagination Logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = attendanceData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(attendanceData.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Event Attendance</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Location</th>
                <th>Date</th>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.eid}</td>
                  <td>{entry.eventname}</td>
                  <td>{entry.location}</td>
                  <td>{entry.date}</td>
                  <td>{entry.sid}</td>
                  <td>{entry.studentname}</td>
                  <td className={entry.attendevent === "Present" ? "text-success" : "text-danger"}>
                    {entry.attendevent}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          <Pagination className="justify-content-center">
            {[...Array(totalPages).keys()].map(num => (
              <Pagination.Item
                key={num + 1}
                active={num + 1 === currentPage}
                onClick={() => paginate(num + 1)}
              >
                {num + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}
    </Container>
  );
};

export default EventAttendance;
