import React, { useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";


import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

import "./App.css";
import Dashboard from "../Dashboard/Dashboard";
import EventDetails from "../EventDetails/EventDetails";
import CreateEvent from "../CreateEvent/CreateEvent";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/dashboard"
          >
            <Dashboard />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/event-details"
          >
            <EventDetails />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/create-event"
          >
            <CreateEvent />
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
