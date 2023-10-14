import React, { useEffect } from "react";
import { HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

import "./App.css";
import Dashboard from "../Dashboard/Dashboard";
import EventDetails from "../EventDetails/EventDetails";
import CreateEvent from "../CreateEvent/CreateEvent";
import InvitePage from "../InvitePage/InvitePage";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  console.log(user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /dashboard page
              <Redirect to="/dashboard" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>
          <Route exact path="/register">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /dashboard page
              <Redirect to="/dashboard" />
            ) : (
              // Otherwise, show the login page
              <RegisterPage />
            )}
          </Route>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/dashboard"
          >
            
            {!user.id ? <Redirect to="/" /> :  <Dashboard />}
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/event-details/:id"
          >
            
            {!user.id ? <Redirect to="/" /> :  <EventDetails />}
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/create-event"
          >
            
            {user.role !=="admin" ? <Redirect to="/dashboard" /> :  <CreateEvent />}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/invitepage"
          >
            
            {!user.id ? <Redirect to="/" /> :  <InvitePage />}
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
