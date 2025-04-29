import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sample data for upcoming events
const upcomingEvents = [
  {
    title: 'Annual Alumni Meetup 2025',
    date: '2025-05-20',
    time: '6:00 PM',
    venue: 'Main Auditorium',
    description: 'A grand celebration to reconnect with alumni across all batches.',
  },
  {
    title: 'Tech Talk: AI Trends in 2025',
    date: '2025-06-05',
    time: '3:00 PM',
    venue: 'Seminar Hall 2',
    description: 'A session with alumni experts discussing cutting-edge AI tech.',
  },
  {
    title: 'Alumni Networking Dinner',
    date: '2025-06-18',
    time: '7:30 PM',
    venue: 'City Club, Downtown',
    description: 'Dinner and informal networking with successful alumni.',
  },
];

const Events = () => {
  return (
    <div className="container-fluid " id="upcoming-events">
      <h2 className="text-center mb-4">Upcoming Alumni Events</h2>
      <div className="row">
        {upcomingEvents.map((event, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm border-primary">
              <div className="card-body">
                <h5 className="card-title text-primary">{event.title}</h5>
                <p className="card-text">
                  <strong>Date:</strong> {event.date}<br />
                  <strong>Time:</strong> {event.time}<br />
                  <strong>Venue:</strong> {event.venue}
                </p>
                <p className="card-text">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
