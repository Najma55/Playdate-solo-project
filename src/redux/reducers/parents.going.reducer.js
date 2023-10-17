const parentsGoingReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PARENTS_GOING":
      return action.payload;

    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default parentsGoingReducer;
