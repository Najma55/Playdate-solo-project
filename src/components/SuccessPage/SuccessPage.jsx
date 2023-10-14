import React from "react";
import "./SuccessPage.css";
import Nav from "../Nav/Nav";

export default function SuccessPage() {
  return (
    <>
      <Nav />
      <div className="create-event-form success-page">
        <div className="success-page-title">
          <h1>Booking Success!</h1>
          <p>You have booked to go to event y on 01/03/23</p>
        </div>
        <div className="success-page-title">
          <p>Share your invite link with other parents to invite them!</p>
          <button className="book copy">Copy Invite Link</button>
        </div>
      </div>
    </>
  );
}
