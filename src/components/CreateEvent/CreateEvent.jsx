import React from "react";
import Nav from "../Nav/Nav";
import "./CreateEvent.css"

export default function CreateEvent() {
  return (
    <div>
      <Nav /> {/* Include the navigation bar */}
      <div className="create-event-form">
        <h2>Create New Event</h2>
        <div className="input-field">
          <input type="text" id="eventName" name="eventName" placeholder="Event Name" />
        </div>
        <div className="input-field">
          <input type="text" id="eventAddress" name="eventAddress" placeholder="Event Address" />
        </div>
        <div className="event-type-buttons">
          <button className="repeating-button">Repeating Event</button>
          <button className="non-repeating-button">Non-repeating Event</button>
        </div>
      </div>
    </div>
  );
}
