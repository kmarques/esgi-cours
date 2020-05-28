import React, { createContext, useState, useEffect } from "react";

import { fetchBoards } from "./actions/boards-localstorage";
import { addList, fetchLists } from "./actions/lists-localstorage";

const BoardContext = createContext({
  boards: [],
  lists: {},
});

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [lists, setLists] = useState({});

  useEffect(() => {
    fetchBoards().then((data) => setBoards(data));
  }, []);

  const actions = {
    addList: (list, board) => {
      list.boardId = board.id;

      addList(list).then((data) =>
        setLists({
          ...lists,
          [board.id]: [...lists[board.id], data],
        })
      );
    },
    getLists: (board) => {
      if (lists[board.id] === undefined)
        fetchLists(board).then((data) =>
          setLists({
            ...lists,
            [board.id]: data,
          })
        );
    },
  };

  const selectors = {
    getBoards: () => boards,
    getBoardsCount: () => boards.length,
    getLists: (board) => lists[board.id],
  };
  return (
    <BoardContext.Provider value={{ selectors, actions }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContext;
