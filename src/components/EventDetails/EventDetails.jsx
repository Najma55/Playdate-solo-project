import React from "react";
import Nav from "../Nav/Nav";
import "./EventDetails.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDateToShortMonthString } from "../Dashboard/Dashboard";
export default function EventDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  const eventdetails = useSelector((store) => store.eventdetails);
  const parentsgoing = useSelector((store) => store.parentsgoing);
  console.log(parentsgoing);

  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_DETAILS", payload: params.id });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "FETCH_PARENTS_GOING", payload: params.id });
  }, [dispatch]);
  return (
    <>
      <Nav />
      <div className="eventpage">
        <div className="eventdetails">
          <img
            src={
              eventdetails?.image
                ? eventdetails?.image
                : "https://m.media-amazon.com/images/M/MV5BZDAzN2FhMTgtMzg5YS00ZDFkLWFiMTUtZTVmMzk4ZjEyMmJmXkEyXkFqcGdeQXVyNjkzMjkzMTY@._V1_.jpg"
            }
            alt=""
          />
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
            <p>{parentsgoing?.length} parents going</p>
            <button
              onClick={() => history.push("/book-event/" + 1)}
              className="book"
            >
              Book
            </button>
          </div>
        </div>
        <div className="parents">
          {parentsgoing?.map((parent) => (
            <Parentgoing key={parent.id} name={parent.name} dates={eventdetails["non-repeating-dates"]}/>
          ))}
        </div>
      </div>
    </>
  );
}
function Parentgoing({ name, dates }) {
  return (
    <div className="parent">
      <h2>{name}</h2>
      <div className="dates">
        {dates.map((date) => (
          <span key={date}>{formatDateToShortMonthString(new Date(date))}</span>
        ))}
      </div>
    </div>
  );
}
