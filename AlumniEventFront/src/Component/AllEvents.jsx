// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './AllEvents.css'; // Import your styles for the component

// const AllEvents = () => {
//   const [events, setEvents] = useState([]); // Stores the event list
//   const [loading, setLoading] = useState(false); // Loading state
//   const [errorMessage, setErrorMessage] = useState(''); // Error state
//   const [successMessage, setSuccessMessage] = useState(''); // Success message after applying

//   // Fetch events from the backend API based on student ID
//   const fetchEvents = async () => {
//     setLoading(true);
//     try {
//       // Get student data from localStorage and parse it into an object
//       const student = JSON.parse(localStorage.getItem('student'));

//       // If no sid exists, show an error
//       if (!student || !student.sid) {
//         setErrorMessage('Student ID is missing. Please log in first.');
//         setLoading(false);
//         return;
//       }

//       // Call the API with the student ID
//       const response = await axios.get(`http://localhost:8080/api/getAssignedEventByStudent/${student.sid}`);
//       setEvents(response.data);
      
//       setErrorMessage('');
//     } catch (error) {
//       console.error('Error fetching events:', error);
//       setErrorMessage('Error fetching events. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // UseEffect hook to fetch events when component mounts
//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // Handle event registration
//   const handleApply = (eventName) => {
//     setSuccessMessage(`Successfully registered for ${eventName}`);
//   };

//   return (
//     <div className="events-container">
//       <h1>Upcoming Events</h1>

//       {/* Show error message if there's an issue fetching events */}
//       {errorMessage && <div className="error-message">{errorMessage}</div>}

//       {/* Show success message after applying for an event */}
//       {successMessage && <div className="success-message">{successMessage}</div>}

//       {loading ? (
//         <p>Loading events...</p>
//       ) : (
//         <div className="events-list">
//           {events.length > 0 ? (
//             events.map((event, index) => (
//               <div key={`${event.eid}-${index}`} className="event-item">
//                 <h3>{event.eventname}</h3> {/* Corrected to use event.eventname */}
//                 <p>Date: {new Date(event.date).toLocaleDateString()}</p>
//                 <p>Location: {event.location}</p>
//                 <button onClick={() => handleApply(event.eventname)} className="apply-btn">
//                   Apply
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p>No events available.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };
// export default AllEvents;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AllEvents.css';

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const student = JSON.parse(localStorage.getItem('student'));
      if (!student || !student.sid) {
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: 'Student info missing. Please log in again.',
        });
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/api/getAssignedEventByStudent/${student.sid}`
      );

      setEvents(response.data); // Must include attendevent = 'yes' or 'no'

    } catch (error) {
      console.error('Error fetching events:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Unable to fetch events. Try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (eid, eventName) => {
    const student = JSON.parse(localStorage.getItem('student'));
    try {
      await axios.put(
        `http://localhost:8080/api/apply/${student.sid}/${eid}`
      );

      Swal.fire({
        icon: 'success',
        title: 'Registered!',
        text: `You have registered for "${eventName}".`,
      });

      // Update state to show "Applied"
      setEvents(prev =>
        prev.map(event =>
          event.eid === eid ? { ...event, attendevent: 'yes' } : event
        )
      );
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire({
          icon: 'info',
          title: 'Already Registered',
          text: `You already registered for "${eventName}".`,
        });
      } else {
        console.error('Apply error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong while applying.',
        });
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      <h1>Upcoming Events</h1>
      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events assigned to you.</p>
      ) : (
        <div className="events-list">
          {events.map((event) => (
            <div key={event.eid} className="event-item">
              <h3>{event.eventname}</h3>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Location: {event.location}</p>
              <button
                onClick={() => handleApply(event.eid, event.eventname)}
                disabled={event.attendevent === 'yes'}
                className={`apply-btn ${event.attendevent === 'yes' ? 'applied' : ''}`}
              >
                {event.attendevent === 'yes' ? 'Applied' : 'Apply'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEvents;
