import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-fullscreen">
      <div className="about-box">
        <h1>About Us</h1>

        <section className="about-description">
          <p>
            The <strong>Alumni Management System</strong> is a cutting-edge digital platform designed to strengthen
            the bond between educational institutions and their alumni. It allows institutions to efficiently manage
            alumni information, engage them in events, and offer a central hub for networking, career development, and
            lifelong connections.
          </p>
        </section>

        <section className="about-vision">
          <h2>Our Vision</h2>
          <p>
            To build a thriving, collaborative alumni community that supports professional growth, fosters lifelong
            relationships, and contributes to institutional advancement.
          </p>
        </section>

        <section className="about-features">
          <h2>Key Features</h2>
          <ul>
            <li>Comprehensive alumni profiles and data management</li>
            <li>Event management and communication tools</li>
            <li>Job boards and mentorship programs</li>
            <li>Real-time news updates and announcements</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
