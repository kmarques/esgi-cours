import React, { createContext, useState, useEffect, useReducer } from "react";
import { fetchLists, addList } from "./actions/lists";
import { fetchBoards } from "./actions/boards";

const BoardContext = createContext({
  boards: [],
  lists: {},
});

/**
 * action = {type: String, payload: any}
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "RECEIVE_BOARDS":
      return {
        ...state,
        boards: action.payload,
      };
    default:
      return state;
  }
};

export const BoardProvider = ({ children }) => {
  const [selectedBoard, setSelectedBoard] = useState(undefined);
  const [lists, setLists] = useState({});
  const [state, dispatch] = useReducer(reducer, {
    boards: [],
    lists: {},
  });

  useEffect(() => {
    actions.fetchBoards();
  }, []);

  const actions = {
    fetchBoards: function () {
      fetchBoards().then((data) => {
        dispatch({
          type: "RECEIVE_BOARDS",
          payload: data,
        });
        this.select(data[0]);
      });
    },
    select: (board) => setSelectedBoard(board),
    fetchList: (board) =>
      !lists[board.id] &&
      fetchLists(board).then((data) =>
        setLists({ ...lists, [board.id]: data })
      ),
    addList: function (list, board) {
      list.boardId = board.id;
      addList(list).then((data) =>
        setLists({ ...lists, [board.id]: [...lists[board.id], data] })
      );
    },
  };

  const selectors = {
    getLists: (board) => lists[board.id],
    getBoards: () => state.boards,
    getSelectedBoard: () => selectedBoard,
  };

  return (
    <BoardContext.Provider value={{ selectors, actions }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContext;
