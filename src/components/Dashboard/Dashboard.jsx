import React from "react";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
import "./Dashboard.css"

export default function Dashboard() {
  const dummyEvents = [
    { id: 0, name: "Zoo Tour", dates: [new Date(), new Date()] },
    { id: 1, name: "Concert", dates: [new Date(), new Date()] },
    { id: 2, name: "Exhibition", dates: [new Date(), new Date()] },
    { id: 3, name: "Festival", dates: [new Date(), new Date()] },
    { id: 4, name: "Art Show", dates: [new Date(), new Date()] },
    { id: 5, name: "Sports Event", dates: [new Date(), new Date()] },
  ];
  return (
    <div className="dashboard">
      <Nav />
      <h1>Hi Welcome</h1>
      <div className="cards">
        {dummyEvents.map((event) => (
          <EventCard key={event.id} name={event.name} dates={event.dates} />
        ))}
      </div>
    </div>
  );
}
function EventCard() {
  return (
    <Link className="eventcard" to="/event-details/1">
      <img
        src="https://m.media-amazon.com/images/M/MV5BZDAzN2FhMTgtMzg5YS00ZDFkLWFiMTUtZTVmMzk4ZjEyMmJmXkEyXkFqcGdeQXVyNjkzMjkzMTY@._V1_.jpg"
        alt=""
        height={300}
        width={300}
      />
      <h2>Event Name</h2>
      <div className="dates">
        <span>10 May</span>
        <span>14 June</span>
        <span>12 August</span>
      </div>
    </Link>
  );
}
