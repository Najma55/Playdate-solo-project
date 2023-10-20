import React, { useState } from "react";
import "./SuccessPage.css";
import Nav from "../Nav/Nav";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDateToShortMonthString } from "../Dashboard/Dashboard";
import { useHistory } from "react-router-dom"

export default function SuccessPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const invitedetails = useSelector((store) => store.invitedetails);
  const history= useHistory()
  console.log(invitedetails);
  useEffect(() => {
    dispatch({ type: "FETCH_INVITE_DETAILS", payload: params.invitelink });
  }, [dispatch]);
  const copylink = () => {
    const link = `${process.env.REACT_APP_DOMAIN}/invite/${params.invitelink}`;
    navigator?.clipboard?.writeText(link);
    setHasCopiedLink(true);
  };
  const [hasCopiedLink, setHasCopiedLink] = useState(false);

  return (
    <>
      <Nav />
      <div className="create-event-form success-page">
        <div className="success-page-title">
          <h1>Booking Success!</h1>
          <p>
            You have booked to go to event {invitedetails?.eventName} on{" "}
            {invitedetails?.going_dates?.map((date, index) => (
              <span>
                {formatDateToShortMonthString(new Date(date))}{" "}
                {index === invitedetails?.going_dates?.length - 1 ? "" : ", "}
              </span>
            ))}
          </p>
        </div>
        <div className="success-page-title">
          <p>Share your invite link with other parents to invite them!</p>
          <button onClick={() => copylink()} className="book copy">
            {hasCopiedLink ? "Copied!" : "Copy Invite Link"}
          </button>
          <button onClick={() => history.push("/dashboard")} className="back">
            Go Back To DashBoard
          </button>
        </div>
      </div>
    </>
  );
}
