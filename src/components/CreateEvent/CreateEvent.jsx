import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import "./CreateEvent.css";
import DatePicker from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function CreateEvent() {
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [eventName, setEventName] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventid = queryParams.get("eventid");
  const eventdetails = useSelector((store) => store.eventdetails);
  console.log(eventdetails);
  const today = new Date();
  const tomorrow = new Date();
  const history = useHistory();
  const [values, setValues] = useState([today, tomorrow]);
  useEffect(() => {
    // Fetch event details if we are on edit mode.
    if (eventid) {
      setValues([]);
      dispatch({ type: "FETCH_EVENT_DETAILS", payload: eventid });
    }
  }, [dispatch, eventid]);
  useEffect(() => {
    //Prefill event name and address.
    if (eventdetails) {
      setValues(
        eventdetails["non-repeating-dates"].map((date) => new Date(date))
      );
      setEventName(eventdetails?.name);
      setAddress(eventdetails?.address);
    }
  }, [eventdetails]);

  tomorrow.setDate(tomorrow.getDate() + 1);

  const createEvent = () => {
    console.log("creatEvent");
    const newEventDetails = {
      address: address,
      image:
        "https://m.media-amazon.com/images/M/MV5BZDAzN2FhMTgtMzg5YS00ZDFkLWFiMTUtZTVmMzk4ZjEyMmJmXkEyXkFqcGdeQXVyNjkzMjkzMTY@._V1_.jpg",
      name: eventName,
      // convert all the dates in values array from date time stamp to an actual date.
      nonRepeatingDates: values.map((date) => new Date(date)),
    };
    dispatch({ type: "CREATE_EVENT", payload: newEventDetails });
    history.push("/dashboard");
  };
  const editEvent = () => {
    console.log("editEvent");
    const editedEventDetails = {
      address: address,
      image:
        "https://m.media-amazon.com/images/M/MV5BZDAzN2FhMTgtMzg5YS00ZDFkLWFiMTUtZTVmMzk4ZjEyMmJmXkEyXkFqcGdeQXVyNjkzMjkzMTY@._V1_.jpg",
      name: eventName,
      // convert all the dates in values array from date time stamp to an actual date.
      nonRepeatingDates: values.map((date) => new Date(date)),
      id: eventid,
    };
    dispatch({ type: "EDIT_EVENT", payload: editedEventDetails });
    history.push("/dashboard");
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
            onClick={() => (eventid ? editEvent() : createEvent())}
            className="non-repeating-button create-event-button"
          >
            {eventid ? "Edit" : "Create"} Event
          </button>
        </div>
      ) : (
        <div className="create-event-form">
          <h2>{eventid ? "Edit" : "Create New"} Event</h2>
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
            {eventid ? (
              <button
                onClick={() => setShowDateSelector(true)}
                className="non-repeating-button"
              >
                Continue
              </button>
            ) : (
              <>
                <button disabled className="repeating-button">
                  Repeating Event
                </button>
                <button
                  onClick={() => setShowDateSelector(true)}
                  className="non-repeating-button"
                >
                  Non-repeating Event
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
