// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Registeredevents() {
//   const [events, setEvents] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const sid = localStorage.getItem('sid');  // Retrieve sid from localStorage (Make sure the correct key is used)

//     if (!sid) {
//       setError('Student ID not found. Please log in again.');
//       setLoading(false);
//       return;
//     }

//     // Fetch events assigned to this student (using sid)
//     axios.get(`http://localhost:8080/api/studentassignevents/${sid}`)
//       .then(res => {
//         setEvents(res.data);
//         setError('');
//       })
//       .catch(err => {
//         console.error(err);
//         setError('Could not fetch assigned events.');
//       })
//       .finally(() => setLoading(false));  // Set loading to false after request is complete
//   }, []);

//   const handleCancel = (eid) => {
//     const sid = localStorage.getItem('sid'); // Retrieve sid from localStorage
//     if (!sid) {
//       setError('Student ID not found. Please log in again.');
//       return;
//     }

//     // Cancel event using sid and eid
//     axios.post(`http://localhost:8080/api/cancel/${sid}/${eid}`)
//       .then(res => {
//         alert(res.data);
//         // Remove cancelled event from list
//         setEvents(events.filter(event => event.eid !== eid)); 
//       })
//       .catch(err => {
//         alert('Cancellation failed.');
//         console.error(err);
//       });
//   };

//   if (loading) {
//     return <div>Loading events...</div>;  // Display loading message while fetching
//   }

//   if (error) {
//     return <div>{error}</div>;  // Display error message
//   }

//   return (
//     <div>
//       <h2>Your Assigned Events</h2>
//       {events.length === 0 ? (
//         <p>No events assigned.</p>  // No events to display
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Event Name</th>
//               <th>Location</th>
//               <th>Date</th>
//               <th>Cancel</th>
//             </tr>
//           </thead>
//           <tbody>
//             {events.map(event => (
//               <tr key={event.eid}>
//                 <td>{event.eventname}</td>
//                 <td>{event.location}</td>
//                 <td>{event.date}</td>
//                 <td><button onClick={() => handleCancel(event.eid)}>Cancel</button></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Registeredevents;
