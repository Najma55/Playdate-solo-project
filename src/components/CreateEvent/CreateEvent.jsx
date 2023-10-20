import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import "./CreateEvent.css";
import DatePicker from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function CreateEvent() {
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [eventName, setEventName] = useState("");
  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageLink, setImageLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      setImageLink(eventdetails?.image);
    }
  }, [eventdetails]);

  tomorrow.setDate(tomorrow.getDate() + 1);

  const createEvent = async () => {
    setIsLoading(true);
    const uploadedLink = await uploadOne(imageFile);
    const newEventDetails = {
      address: address,
      image: uploadedLink,
      name: eventName,
      // convert all the dates in values array from date time stamp to an actual date.
      nonRepeatingDates: values.map((date) => new Date(date)),
    };
    dispatch({ type: "CREATE_EVENT", payload: newEventDetails });
    dispatch({ type: "UNSET_EVENT_DETAILS" });
    setIsLoading(false);
    window.alert("Event Created!")
    history.push("/dashboard");
  };
  const editEvent = async () => {
    setIsLoading(true);
    let image = imageLink;
    //We check if the user edited the image and then we upload it.
    if (imageFile) {
      image = await uploadOne(imageFile);
    }
    const editedEventDetails = {
      address: address,
      image: image,
      name: eventName,
      // convert all the dates in values array from date time stamp to an actual date.
      nonRepeatingDates: values.map((date) => new Date(date)),
      id: eventid,
    };
    dispatch({ type: "EDIT_EVENT", payload: editedEventDetails });
    dispatch({ type: "UNSET_EVENT_DETAILS" });
    setIsLoading(false);
    window.alert("Event Edited!")
    history.push("/dashboard");
  };
  return (
    <div>
      <Nav />
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
            {isLoading ? "loading..." : eventid ? "Edit Event" : "Create Event"}
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
          <div className="input-field event-image">
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            {(imageFile || imageLink) && (
              <img
                src={imageFile ? URL.createObjectURL(imageFile) : imageLink}
                alt=""
                height={70}
                width={70}
              />
            )}
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

// A function that takes a file and uploads it to cloudinary and get back a link.
export const uploadOne = async (file) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "playdate");
    data.append(`api_key`, process.env.REACT_APP_CLOUDINARY_API_KEY);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dgkajow8c/upload`,
      data
    );
    return res.data.secure_url;
  } catch (error) {
    console.log(error);
  }
};
