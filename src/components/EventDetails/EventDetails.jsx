import React, { useState } from "react";
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
  const user = useSelector((store) => store.user);
  const [hasBooked, setHasBooked] = useState(null);
  const [inviteLink, setInviteLink] = useState("");
  console.log(parentsgoing);
  useEffect(() => {
    //Check if current parent is present in parents going array.
    if (parentsgoing?.length > 0 && user?.id) {
      if (parentsgoing.find((parent) => parent.id === user.id)) {
        setInviteLink(
          parentsgoing.find((parent) => parent.id === user.id)
            .booking_invite_link
        );
        setHasBooked(true);
      } else {
        setHasBooked(false);
      }
    }
  }, [parentsgoing, user]);

  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_DETAILS", payload: params.id });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "FETCH_PARENTS_GOING", payload: params.id });
  }, [dispatch]);
  const copylink = () => {
    const link = `${process.env.REACT_APP_DOMAIN}/#/invite/${inviteLink}`;
    navigator?.clipboard?.writeText(link);
    setHasCopiedLink(true);
  };
  const [hasCopiedLink, setHasCopiedLink] = useState(false);
  const deleteEvent = () => {
  
    dispatch({ type: "DELETE_EVENT", payload:params.id });
    history.push("/dashboard");
  };
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
            {
              user?.role === "parent" &&
              (hasBooked ? (
                <button onClick={() => copylink()} className="book copy">
                  {hasCopiedLink ? "Copied!" : "Copy Invite Link"}
                </button>
              ) : (
                <button
                  onClick={() => history.push("/book-event/" + params.id)}
                  className="book"
                >
                  Book
                </button>
              ))}
            {user?.role === "admin" && (
              <div>
                <button onClick={()=>history.push("/create-event?eventid="+params.id)} className="book">Edit</button>{" "}
                <button onClick={()=>deleteEvent()} className="book">Delete</button>
              </div>
            )}
          </div>
        </div>
        <div className="parents">
          {parentsgoing?.map((parent) => (
            <Parentgoing
              key={parent.id}
              name={parent.name}
              // Pass the dates that the parents are going to the events. Handle case where some parents don't have the coloumn.
              dates={parent?.going_dates ?? []}
            />
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
