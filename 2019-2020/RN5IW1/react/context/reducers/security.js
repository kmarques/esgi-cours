export default (state, action) => {
  switch (action.type) {
    case 'LOG_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
