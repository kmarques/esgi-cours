export const initialState = {
  boards: [],
  lists: {},
};

/**
 * action = { type: String, payload: any }
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case "RECEIVE_BOARDS":
      return {
        ...state,
        boards: action.payload,
      };
    case "RECEIVE_LISTS":
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.board.id]: action.payload.data,
        },
      };
    case "ADD_LIST":
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.board.id]: [
            ...(state.lists[action.payload.board.id] || []),
            action.payload.data,
          ],
        },
      };
    default:
      return state;
  }
};
