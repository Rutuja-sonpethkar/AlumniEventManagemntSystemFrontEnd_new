// import React, { useState, useEffect } from 'react';
// import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
// import axios from 'axios';
// import './ToStudent.css';
// import AlumniServices from '../Service/AlumniServices';

// const ToStudent = () => {
//   const [eventId, setEventId] = useState('');
//   const [studentId, setStudentId] = useState('');
//   const [events, setEvents] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [assignedEvent, setAssignedEvent] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     AlumniServices.getEvents()
//       .then((res) => {
//         setEvents(res.data);
//       })
//       .catch((err) => {
//         setErrorMessage('Error fetching event data.');
//         console.error(err);
//       });

//     AlumniServices.getStudents()
//       .then((res) => {
//         setStudents(res.data);
//       })
//       .catch((err) => {
//         setErrorMessage('Error fetching student data.');
//         console.error(err);
//       });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage('');
//     setAssignedEvent(null);

//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/assigenEventToStudent/${eventId}/${studentId}`
//       );

//       if (response.status === 200) {
//         setAssignedEvent({ eventId, studentId });
//         setStudentId('');
//       } else {
//         setErrorMessage('Failed to assign event.');
//       }
//     } catch (error) {
//       console.error(error);
//       setErrorMessage('Something went wrong while assigning the event.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="to-student-form-container container mt-4 p-4 border rounded bg-light shadow-sm">
//       <h2 className="to-student-title text-center mb-4">Assign Event to Student</h2>

//       {errorMessage && (
//         <Alert variant="danger" className="to-student-alert text-center">
//           {errorMessage}
//         </Alert>
//       )}

//       {loading && (
//         <div className="to-student-loading text-center">
//           <Spinner animation="border" variant="primary" />
//         </div>
//       )}

//       <Form onSubmit={handleSubmit} className="to-student-form">
//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Label className="to-student-label">Event Name</Form.Label>
//             <Form.Select
//               className="to-student-select"
//               value={eventId}
//               onChange={(e) => setEventId(e.target.value)}
//               required
//             >
//               <option value="">Select Event</option>
//               {events.map((event) => (
//                 <option key={event.eid} value={event.eid}>
//                   {event.name}
//                 </option>
//               ))}
//             </Form.Select>
//           </Col>

//           <Col md={6}>
//             <Form.Label className="to-student-label">Student Name</Form.Label>
//             <Form.Select
//               className="to-student-select"
//               value={studentId}
//               onChange={(e) => setStudentId(e.target.value)}
//               required
//             >
//               <option value="">Select Student</option>
//               {students.map((student) => (
//                 <option key={student.sid} value={student.sid}>
//                   {student.name}
//                 </option>
//               ))}
//             </Form.Select>
//           </Col>
//         </Row>

//         <div className="text-center">
//           <Button variant="primary" type="submit" className="to-student-submit-btn w-50">
//             Assign Event
//           </Button>
//         </div>
//       </Form>

//       {assignedEvent && (
//         <div className="to-student-success mt-4 text-center">
//           <h4>✅ Event Assigned Successfully!</h4>
//           <p>
//             <strong>Event Name:</strong>{' '}
//             {events.find((e) => e.eid === parseInt(assignedEvent.eventId))?.name || 'N/A'}
//           </p>
//           <p>
//             <strong>Student Name:</strong>{' '}
//             {students.find((s) => s.sid === parseInt(assignedEvent.studentId))?.name || 'N/A'}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ToStudent;

import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import './ToStudent.css';
import AlumniServices from '../Service/AlumniServices';
import Swal from 'sweetalert2'; 

const ToStudent = () => {
  const [eventId, setEventId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [events, setEvents] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignedEvent, setAssignedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AlumniServices.getEvents()
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        setErrorMessage('Error fetching event data.');
        console.error(err);
      });

    AlumniServices.getStudents()
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        setErrorMessage('Error fetching student data.');
        console.error(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setAssignedEvent(null);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/assigenEventToStudent/${eventId}/${studentId}`
      );

      if (response.status === 200) {
        setAssignedEvent({ eventId, studentId });
        setStudentId('');

        // Show SweetAlert success message
        Swal.fire({
          icon: 'success',
          title: 'Event Assigned Successfully!',
          text: `Event: ${events.find((e) => e.eid === parseInt(eventId))?.name || 'N/A'}
                 \nStudent: ${students.find((s) => s.sid === parseInt(studentId))?.name || 'N/A'}`,
        });
      } else {
        setErrorMessage('Failed to assign event.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Something went wrong while assigning the event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="to-student-form-container container mt-4 p-4 border rounded bg-light shadow-sm">
      <h2 className="to-student-title text-center mb-4">Assign Event to Student</h2>

      {errorMessage && (
        <Alert variant="danger" className="to-student-alert text-center">
          {errorMessage}
        </Alert>
      )}

      {loading && (
        <div className="to-student-loading text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <Form onSubmit={handleSubmit} className="to-student-form">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label className="to-student-label">Event Name</Form.Label>
            <Form.Select
              className="to-student-select"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              required
            >
              <option value="">Select Event</option>
              {events.map((event) => (
                <option key={event.eid} value={event.eid}>
                  {event.name}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={6}>
            <Form.Label className="to-student-label">Student Name</Form.Label>
            <Form.Select
              className="to-student-select"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.sid} value={student.sid}>
                  {student.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <div className="text-center">
          <Button variant="primary" type="submit" className="to-student-submit-btn w-50">
            Assign Event
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ToStudent;
