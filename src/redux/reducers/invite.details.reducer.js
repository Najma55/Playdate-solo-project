const inviteDetailsReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_INVITE_DETAILS":
      return action.payload;
    case "UNSET_INVITE_DETAILS":
      return null;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default inviteDetailsReducer;
