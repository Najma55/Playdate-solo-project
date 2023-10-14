import React from "react";
import "./InvitePage.css";
import Nav from "../Nav/Nav";

export default function InvitePage() {
  return (
    <div className="content-wrapper">
        <Nav/>
      <div className="invitation-details">
        <h4>
          You have been invited by parent x to attend event y with them on 01/05/24
        </h4>
      </div>
      <button className="joinbutton">Join Them</button>
      <h5 className="event-address">2425 50th St, Minneapolis, Minnesota</h5>
    </div>
  );
}