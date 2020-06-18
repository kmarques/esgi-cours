import { useContext } from "react";
import BoardContext from "../contexts/boardContext";

const useUI = () => {
  const {
    state: { ui: UIState },
    dispatch,
  } = useContext(BoardContext);

  const actions = {
    selectBoard: (board) =>
      dispatch({
        type: "SELECT_BOARD",
        payload: board,
      }),
  };

  const selectors = {
    getSelectedBoard: () => UIState.selectedBoard,
    getMessage: () => UIState.message,
  };

  return { selectors, actions };
};

export default useUI;
