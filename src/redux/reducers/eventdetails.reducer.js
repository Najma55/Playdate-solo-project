const eventdetailsReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_EVENT_DETAILS':
      return action.payload;
    case 'UNSET_EVENT_DETAILS':
      return null;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default eventdetailsReducer;
