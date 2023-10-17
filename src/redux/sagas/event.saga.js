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
    yield axios.post(
      "/api/event/book/" + action.payload.eventid,
      action.payload
    );
  } catch (error) {
    console.log("Error with user create event:", error);
  }
}

function* eventSaga() {
  yield takeLatest("CREATE_EVENT", createEvent);
  yield takeLatest("FETCH_EVENTS", fetchAllEvents);
  yield takeLatest("FETCH_PARENTS_GOING", fetchAllParentsGoing);
  yield takeLatest("BOOK_EVENT", bookEvent);
}

export default eventSaga;
