const eventReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return action.payload;
    case 'UNSET_EVENTS':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default eventReducer;
