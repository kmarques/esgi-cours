import { useContext } from "react";
import BoardContext from "../context/BoardContext";

const useBoards = () => {
  const {
    state: { boards: boardsState },
  } = useContext(BoardContext);

  const actions = {};

  const selectors = {
    getBoards: () => boardsState.boards,
    getBoardsCount: () => boardsState.boards.length,
  };

  return { selectors, actions };
};

export default useBoards;
