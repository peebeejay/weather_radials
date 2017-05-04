const _nullUser = {
  currentUser: null,
  errors: {}
};

const SessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch(action.type){
    default:
      return state;
  }
};

export default SessionReducer;
