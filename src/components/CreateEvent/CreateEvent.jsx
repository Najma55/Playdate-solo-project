import React, { useState } from "react";
import Nav from "../Nav/Nav";
import "./CreateEvent.css";
import DatePicker from "react-multi-date-picker";


export default function CreateEvent() {
  const [showDateSelector, setShowDateSelector] = useState(false);
  const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const [values, setValues] = useState([today, tomorrow]);

  return (
    <div>
      <Nav /> {/* Include the navigation bar */}
      {showDateSelector ? (
        <div className="create-event-form">
          <h2>Choose The Event Dates</h2>
          <DatePicker inputClass="custom-input" multiple value={values} onChange={setValues} />
          <button
              
              className="non-repeating-button create-event-button"
            >
              Create Event
            </button>
        </div>
      ) : (
        <div className="create-event-form">
          <h2>Create New Event</h2>
          <div className="input-field">
            <input
              type="text"
              id="eventName"
              name="eventName"
              placeholder="Event Name"
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              id="eventAddress"
              name="eventAddress"
              placeholder="Event Address"
            />
          </div>
          <div className="event-type-buttons">
            <button disabled className="repeating-button">Repeating Event</button>
            <button
              onClick={() => setShowDateSelector(true)}
              className="non-repeating-button"
            >
              Non-repeating Event
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
