import React from "react";
import Nav from "../Nav/Nav";
import "./EventDetails.css"
import { useHistory } from "react-router-dom"
export default function EventDetails() {
    const history =useHistory()
  return (
    <>
      <Nav />
      <div className="eventpage">
        <div className="eventdetails">
          <img src="https://m.media-amazon.com/images/M/MV5BZDAzN2FhMTgtMzg5YS00ZDFkLWFiMTUtZTVmMzk4ZjEyMmJmXkEyXkFqcGdeQXVyNjkzMjkzMTY@._V1_.jpg" alt="" />
          <div className="e-details">
            <h1>Minnesota Zoo Tour</h1>
            <div className="dates eventdates">
              <span>10 May</span>
              <span>14 June</span>
              <span>12 August</span>
            </div>
            <p>3421 Kings St</p>
            <p>60 parents going</p>
            <button onClick={()=>history.push("/book-event/"+1)} className="book">Book</button>
          </div>
        </div>
        <div className="parents">
          <Parentgoing />
          <Parentgoing />
          <Parentgoing />
          <Parentgoing />
          <Parentgoing />
        </div>
      </div>
    </>
  );
}
function Parentgoing() {
  return (
    <div className="parent">
      <h2>Omar</h2>
      <div className="dates">
        <span>10 May</span>
        <span>12 August</span>
      </div>
    </div>
  );
}
