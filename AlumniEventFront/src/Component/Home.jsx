import React from "react";
import './Home.css';
import video from "../assets/video.mp4"

const Home = () => {
  return (
    <section className="home-section  text-white">
      <video autoPlay muted loop className="bg-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* <div className="overlay d-flex flex-column justify-content-center align-items-center text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to Alumni EMS</h1>
          <p className="lead">Connect | Celebrate | Grow</p>
        </div>
      </div> */}
    </section>
  );
};

export default Home;
