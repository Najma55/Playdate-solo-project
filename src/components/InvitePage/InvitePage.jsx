import React from "react";
import "./InvitePage.css";
import Nav from "../Nav/Nav";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDateToShortMonthString } from "../Dashboard/Dashboard";
import { useHistory } from "react-router-dom"

export default function InvitePage() {
  const params = useParams();
  const dispatch = useDispatch();
  const invitedetails = useSelector((store) => store.invitedetails);
  const history= useHistory()
  console.log(invitedetails);
  useEffect(() => {
    dispatch({ type: "FETCH_INVITE_DETAILS", payload: params.invitecode });
  }, [dispatch]);
  useEffect(() => {
    // Save invite code to the local storage. So that we can use it later when the parent joins.
    if (invitedetails){
      localStorage.setItem("invitecode",params.invitecode)
    }
   
  }, [invitedetails]);
  return (
    <div className="content-wrapper">
      <Nav />
      <div className="invitation-details">
       
        <h4>
            You have been Invited by {invitedetails?.parentName}  to attend event  {invitedetails?.eventName} on{" "}
            {invitedetails?.going_dates?.map((date, index) => (
              <span>
                {formatDateToShortMonthString(new Date(date))}{" "}
                {index === invitedetails?.going_dates?.length - 1 ? "" : ", "}
              </span>
            ))}
          </h4>
      </div>
      <button onClick={()=>history.push("/register")} className="joinbutton">Join Them</button>
      <h5 className="event-address">{invitedetails?.address}</h5>
    </div>
  );
}
