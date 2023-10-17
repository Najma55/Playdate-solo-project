import React from "react";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
export default function Dashboard() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  const dispatch = useDispatch();

  const events = useSelector((store) => store.events);
  console.log("events", events);

  useEffect(() => {
    dispatch({ type: "FETCH_EVENTS" });
  }, [dispatch]);
  return (
    <div className="dashboard">
      <Nav />
      <h1>Hi Welcome</h1>
      <div className="cards">
        {events?.map((event) => (
          <EventCard
            key={event.id}
            name={event.name}
            dates={event["non-repeating-dates"]}
            id={event.id}
            image={event.image}
          />
        ))}
      </div>
      {user?.role === "admin" && (
        <button
          onClick={() => history.push("/create-event")}
          className="non-repeating-button create-event-button admin-create-button"
        >
          Create Event
        </button>
      )}
    </div>
  );
}
export function formatDateToShortMonthString(inputDate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = inputDate.getDate();
  const month = months[inputDate.getMonth()];

  return `${day} ${month}`;
}
function EventCard({ name, dates, id, image }) {
  return (
    <Link className="eventcard" to={"/event-details/" + id}>
      <img src={image} alt="" height={300} width={300} />
      <h2>{name}</h2>
      <div className="dates">
        {dates.map((date) => (
          <span key={date}>{formatDateToShortMonthString(new Date(date))}</span>
        ))}
      </div>
    </Link>
  );
}
