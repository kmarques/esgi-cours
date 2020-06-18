import { useContext } from "react";
import BoardContext from "../context/BoardContext";
import { addList, fetchLists } from "../context/actions/lists-localstorage";

const useLists = () => {
  const {
    state: { lists: listsState },
    dispatch,
  } = useContext(BoardContext);

  const actions = {
    addList: (list, board) => {
      list.boardId = board.id;
      addList(list).then((data) =>
        dispatch({
          type: "RECEIVE_NEW_LIST",
          payload: {
            board,
            list: data,
          },
        })
      );
    },
    getLists: (board) => {
      if (listsState.lists[board.id] === undefined)
        fetchLists(board).then((data) =>
          dispatch({
            type: "RECEIVE_LISTS",
            payload: {
              board,
              lists: data,
            },
          })
        );
    },
  };

  const selectors = {
    getLists: (board) => listsState.lists[board.id],
  };

  return { selectors, actions };
};

export default useLists;
