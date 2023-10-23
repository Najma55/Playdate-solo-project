import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useDispatch, useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <div className="nav">
      <button onClick={()=>window.location.href="/dashboard"}>
        <img src="/512x512.png" height={40} width={40} alt="" />
      </button>
      <div className="userdetails">
        <div className="parentdetails">
          <img
            src="https://play-lh.googleusercontent.com/7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA"
            alt=""
            height={30}
            width={30}
          />
          <h2>{user?.name}</h2>
        </div>
        <div className="logout">
          <span onClick={() => dispatch({ type: "LOGOUT" })}>Log Out</span>
        </div>
      </div>
    </div>
  );
}

export default Nav;
