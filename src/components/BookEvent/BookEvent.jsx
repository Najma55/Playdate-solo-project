import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./BookEvent.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Nav from "../Nav/Nav";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { formatDateToShortMonthString } from "../Dashboard/Dashboard";
import { useParams } from "react-router-dom";
const localizer = momentLocalizer(moment);
export default function BookEvent() {
  const [eventDates, setEventDates] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const eventdetails = useSelector((store) => store.eventdetails);
  const inviteLink = useSelector((store) => store.inviteLink);
  const params = useParams();
  const [selectedEventDates, setSelectedEventDates] = useState([]);

  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_DETAILS", payload: params.id });
  }, [dispatch]);

  useEffect(() => {
    // Use effect for creating event dates for the calendar.
    if (eventdetails) {
      setEventDates(
        eventdetails["non-repeating-dates"].map((date) => {
          // create an event object for the calendar to show the event.
          return {
            start: moment(new Date(date)),
            end: moment(new Date(date)),
            title: eventdetails.name,
          };
        })
      );
    }
  }, [eventdetails]);

  const selectEventDate = (event) => {
    // This function is called when an event date is selected. it is used for showing the user the dates they have selected for the event.
    if (
      selectedEventDates.filter((e) => e.start === event.start).length === 0
    ) {
      setSelectedEventDates([...selectedEventDates, event]);
    }
  };
  const user = useSelector((store) => store.user);
  const bookThisEvent = () => {
    dispatch({
      type: "BOOK_EVENT",
      payload: {
        userID: user.id,
        eventid: params.id,
        //take the selected events and grab the start date. 
        going_dates:selectedEventDates.map((date)=>new Date(date.start))
      },
    });

    // history.push("/success");
  };
  useEffect(()=>{
    //listen for invite link once we have it redirect user to sucess page. 
    if (inviteLink?.lenght>0){
      history.push("/success/"+inviteLink)
    }
  },[inviteLink])

  return (
    <>
      <Nav />
      <div className="create-event-form book-event-page">
        <div className="e-details">
          <h1>{eventdetails?.name}</h1>
          {eventdetails && (
            <div className="dates eventdates">
              {eventdetails["non-repeating-dates"]?.map((date) => (
                <span key={date}>
                  {formatDateToShortMonthString(new Date(date))}
                </span>
              ))}
            </div>
          )}
          <p>{eventdetails?.address}</p>
        </div>
        <Calendar
          view="month"
          onSelectEvent={(event) => selectEventDate(event)}
          localizer={localizer}
          defaultDate={new Date(moment().add(10, "days").toDate())}
          defaultView="month"
          events={eventDates}
          style={{ height: "60vh", width: "80vw" }}
        />
        <div>
          <p>Your Selected Dates Are</p>
          {selectedEventDates && (
            <div className="dates eventdates">
              {selectedEventDates?.map((date) => (
                <span key={date}>
                  {formatDateToShortMonthString(new Date(date?.start))}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="event-type-buttons">
          <button className="repeating-button cancel">Cancel</button>
          <button
            onClick={() => bookThisEvent()}
            className="non-repeating-button"
          >
            Book Event
          </button>
        </div>
      </div>
    </>
  );
}
