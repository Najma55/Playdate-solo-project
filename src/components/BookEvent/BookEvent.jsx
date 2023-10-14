import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./BookEvent.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Nav from "../Nav/Nav";
const localizer = momentLocalizer(moment);
export default function BookEvent() {
  const [eventDates, setEventDates] = useState([
    {
      start: moment().toDate(),
      end: moment().add(0, "days").toDate(),
      title: "Zoo Tour",
    },
    {
      start: moment().add(3, "days").toDate(),
      end: moment().add(3, "days").toDate(),
      title: "Museum Tour",
    },
    {
      start: moment().add(4, "days").toDate(),
      end: moment().add(4, "days").toDate(),
      title: "Museum Tour",
    },
    {
      start: moment().add(10, "days").toDate(),
      end: moment().add(11, "days").toDate(),
      title: "Bounce House Activities",
    },
  ]);

  return (
    <>
      <Nav />
      <div className="create-event-form book-event-page">
        <div className="e-details">
          <h1>Event XYZ</h1>
          <div className="dates eventdates">
            <span>10 May</span>
            <span>14 June</span>
            <span>12 August</span>
          </div>
          <p>2425 50th St, Minneapolis, Minnesota</p>
        </div>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventDates}
          style={{ height: "60vh", width: "80vw" }}
        />
      </div>
    </>
  );
}
