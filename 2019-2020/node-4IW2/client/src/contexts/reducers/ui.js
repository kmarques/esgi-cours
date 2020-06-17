export const initialState = {
  selectedBoard: null,
  message: null,
};

/**
 * action = { type: String, payload: any }
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_BOARD":
      return {
        ...state,
        selectedBoard: action.payload,
      };
    case "RECEIVE_LISTS":
    case "ADD_LIST":
    case "RECEIVE_BOARDS":
      return {
        ...state,
        message: "Opération terminée " + action.type,
      };
    default:
      return state;
  }
};
