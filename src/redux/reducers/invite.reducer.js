const inviteReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_INVITE_LINK":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default inviteReducer;
