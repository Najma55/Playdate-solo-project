import React, { useState } from "react";
import Nav from "../Nav/Nav";
import "./CreateEvent.css";
import DatePicker from "react-multi-date-picker";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"

export default function CreateEvent() {
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [eventName, setEventName] = useState("");
  const [address, setAddress] = useState("");
  const dispatch= useDispatch()

  const today = new Date();
  const tomorrow = new Date();
  const history = useHistory();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const [values, setValues] = useState([today, tomorrow]);
  const createEvent = () => {
    console.log("creatEvent");
    const newEventDetails = {
      address: address,
      image:
        "https://m.media-amazon.com/images/M/MV5BZDAzN2FhMTgtMzg5YS00ZDFkLWFiMTUtZTVmMzk4ZjEyMmJmXkEyXkFqcGdeQXVyNjkzMjkzMTY@._V1_.jpg",
      name: eventName,
      // convert all the dates in values array from date time stamp to an actual date. 
      nonRepeatingDates: values.map((date)=>new Date(date)),
    };
    dispatch({type:"CREATE_EVENT", payload:newEventDetails})
    history.push("/dashboard")
  };
  return (
    <div>
      <Nav /> {/* Include the navigation bar */}
      {showDateSelector ? (
        <div className="create-event-form">
          <h2>Choose The Event Dates</h2>
          <DatePicker
            inputClass="custom-input"
            multiple
            value={values}
            onChange={setValues}
          />
          <button
            onClick={() => createEvent()}
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
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              id="eventAddress"
              name="eventAddress"
              placeholder="Event Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="event-type-buttons">
            <button disabled className="repeating-button">
              Repeating Event
            </button>
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
