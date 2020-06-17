import { useContext } from "react";
import BoardContext from "../contexts/boardContext";
import {
  fetchLists as aFetchLists,
  addList as aAddList,
} from "../contexts/actions/lists";

const useBoards = () => {
  const {
    state: { boards: boardsState },
    dispatch,
  } = useContext(BoardContext);

  const actions = {
    fetchLists: (board) =>
      !boardsState.lists[board.id] &&
      aFetchLists(board).then((data) =>
        dispatch({
          type: "RECEIVE_LISTS",
          payload: {
            board,
            data,
          },
        })
      ),
    addList: (list) => {
      aAddList(list).then((data) =>
        dispatch({
          type: "ADD_LIST",
          payload: {
            board: { id: list.boardId },
            data,
          },
        })
      );
    },
  };

  const selectors = {
    getLists: (board) => boardsState.lists[board.id] || [],
    getBoards: () => boardsState.boards,
  };
  return { selectors, actions };
};

export default useBoards;
