import React, { createContext, useState, useEffect, useReducer } from "react";
import { fetchBoards } from "./actions/boards";
import {
  fetchLists as aFetchLists,
  addList as aAddList,
} from "./actions/lists";

const BoardContext = createContext({
  boards: [],
  lists: {},
});

/**
 * action = { type: String, payload: any }
 */
const reducer = (state, action) => {
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

export const BoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    boards: [],
    lists: {},
  });

  useEffect(() => {
    fetchBoards().then((data) =>
      dispatch({
        type: "RECEIVE_BOARDS",
        payload: data,
      })
    );
  }, []);

  const fetchLists = (board) =>
    !state.lists[board.id] &&
    aFetchLists(board).then((data) =>
      dispatch({
        type: "RECEIVE_LISTS",
        payload: {
          board,
          data,
        },
      })
    );

  const addList = (list) => {
    aAddList(list).then((data) =>
      dispatch({
        type: "ADD_LIST",
        payload: {
          board: { id: list.boardId },
          data,
        },
      })
    );
  };

  const getLists = (board) => state.lists[board.id] || [];
  const getBoards = () => state.boards;

  return (
    <BoardContext.Provider value={{ getBoards, getLists, fetchLists, addList }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContext;
