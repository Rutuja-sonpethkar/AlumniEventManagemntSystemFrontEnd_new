import { useState } from "react";
import axios from "axios";
import "./AddEvent.css"; 

function AddEvent() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    date: "", 
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form submitted:", form);

      const response = await axios.post("http://localhost:8080/api/events", form);

      console.log("Server response:", response.data);
      alert("Event created successfully!");

     
      setForm({
        name: "",
        location: "",
        date: "",
      });
    } catch (error) {
      console.error("Error submitting event:", error);

      if (error.response) {
        alert(`Server Error: ${error.response.data.message || "Unknown error"}`);
      } else if (error.request) {
        alert("No response from server. Please check your backend.");
      } else {
        alert("Something went wrong while creating the event.");
      }
    }
  };

  return (
    <div className="event-container">
      <form className="event-form" onSubmit={handleSubmit}>
        <h2>Create New Event</h2>

        <input
          name="name"
          placeholder="Event Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default AddEvent;
