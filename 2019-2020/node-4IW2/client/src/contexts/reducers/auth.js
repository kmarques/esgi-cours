export const initialState = {
  token: null,
};

/**
 * action = { type: String, payload: any }
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      action.stopPropagation = true;
      return {
        ...state,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
