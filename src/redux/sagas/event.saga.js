import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "REGISTER" actions
function* createEvent(action) {
  try {
    yield axios.post("/api/event/create-event", action.payload);
  } catch (error) {
    console.log("Error with user create event:", error);
  }
}
function* fetchAllEvents() {
  // get all events from the DB
  try {
    const events = yield axios.get("/api/event/all");

    yield put({ type: "SET_EVENTS", payload: events.data });
  } catch {
    console.log("get all error");
  }
}
function* fetchAllParentsGoing(action) {
  // get all events from the DB
  try {
    const parents = yield axios.get(
      "/api/event/parents-going/" + action.payload
    );

    yield put({ type: "SET_PARENTS_GOING", payload: parents.data });
  } catch {
    console.log("get all error");
  }
}
function* bookEvent(action) {
  try {
    const response = yield axios.post(
      "/api/event/book/" + action.payload.eventid,
      action.payload
    );
    yield put({
      type: "SET_INVITE_LINK",
      payload: response.data["invite-link"],
    });
  } catch (error) {
    console.log("Error with user create event:", error);
  }
}
function* acceptInvite(action) {
  try {
    const response = yield axios.post("/api/event/accept/" + action.payload);
  } catch (error) {
    console.log("Error with user create event:", error);
  }
}
function* fetchInviteDetails(action) {
  // get all events from the DB
  try {
    const inviteDetails = yield axios.get(
      "/api/event/invite/" + action.payload
    );

    yield put({ type: "SET_INVITE_DETAILS", payload: inviteDetails.data });
  } catch {
    console.log("get all error");
  }
}
function* editEvent(action) {
  // get all events from the DB
  try {
    yield axios.put("/api/event/" + action.payload.id, action.payload);
  } catch {
    console.log("get all error");
  }
}
function* deleteEvent(action) {
  // get all events from the DB
  try {
    yield axios.delete("/api/event/" + action.payload);
  } catch {
    console.log("get all error");
  }
}


function* eventSaga() {
  yield takeLatest("CREATE_EVENT", createEvent);
  yield takeLatest("FETCH_EVENTS", fetchAllEvents);
  yield takeLatest("FETCH_PARENTS_GOING", fetchAllParentsGoing);
  yield takeLatest("BOOK_EVENT", bookEvent);
  yield takeLatest("FETCH_INVITE_DETAILS", fetchInviteDetails);
  yield takeLatest("ACCEPT_INVITE", acceptInvite);
  yield takeLatest("EDIT_EVENT", editEvent);
  yield takeLatest("DELETE_EVENT", deleteEvent);
}

export default eventSaga;
