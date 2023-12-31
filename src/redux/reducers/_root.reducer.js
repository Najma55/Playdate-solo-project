import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import events from "./event.reducer"
import eventdetails from "./eventdetails.reducer"
import parentsgoing from './parents.going.reducer';
import inviteLink from './invite.reducer';
import invitedetails from "./invite.details.reducer"

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  events,
  eventdetails,
  parentsgoing,
  inviteLink,
  invitedetails
});

export default rootReducer;
