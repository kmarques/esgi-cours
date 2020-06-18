export const initialState = {
  boards: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "RECEIVE_BOARDS":
      action.stopPropagation = true;
      return {
        ...state,
        boards: action.payload,
      };
    case "RECEIVE_NEW_BOARDS":
      return {
        ...state,
        boards: [...state.boards, action.payload],
      };
    case "RECEIVE_DELETE_BOARDS":
      return {
        ...state,
        boards: state.boards.filter(
          (item) => action.payload.board.id !== item.id
        ),
      };
    default:
      return state;
  }
};
