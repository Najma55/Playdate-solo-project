import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./BookEvent.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Nav from "../Nav/Nav";
import { useHistory } from "react-router-dom"
const localizer = momentLocalizer(moment);
export default function BookEvent() {
  const [eventDates, setEventDates] = useState([
    {
      start: moment().add(10, "days").toDate(),
      end: moment().add(11, "days").toDate(),
      title: "Bounce House Activities",
    },
  ]);
  const history = useHistory()

  return (
    <>
      <Nav />
      <div className="create-event-form book-event-page">
        <div className="e-details">
          <h1>Bounce House Activities</h1>
          <div className="dates eventdates">
            <span>10 May</span>
            <span>14 June</span>
            <span>12 August</span>
          </div>
          <p>2425 50th St, Minneapolis, Minnesota</p>
        </div>
        <Calendar
          localizer={localizer}
          defaultDate={new Date(moment().add(10, "days").toDate())}
          defaultView="month"
          events={eventDates}
          style={{ height: "60vh", width: "80vw" }}
        />
        <div className="event-type-buttons">
          <button className="repeating-button cancel">Cancel</button>
          <button
            onClick={() => history.push("/success")}
            className="non-repeating-button"
          >
            Book Event
          </button>
        </div>
      </div>
    </>
  );
}
