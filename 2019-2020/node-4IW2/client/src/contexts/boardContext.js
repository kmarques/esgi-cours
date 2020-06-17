import React, { createContext, useState, useEffect, useReducer } from "react";
import { fetchBoards } from "./actions/boards";
import {
  reducer as UIReducer,
  initialState as UIInitialState,
} from "./reducers/ui";
import {
  reducer as BoardReducer,
  initialState as BoardInitialState,
} from "./reducers/boards";

const BoardContext = createContext(null);

const combineReducers = (reducers) => {
  return function (state, action) {
    console.log(`combineReducer - action ${action.type}`);
    return Object.keys(reducers).reduce((acc, keyReducer) => {
      console.log(`Reducer ${keyReducer} - action ${action.type}`);
      return {
        ...acc,
        [keyReducer]: reducers[keyReducer](state[keyReducer], action),
      };
    }, state);
  };
};

/**
 * rootState = {
 *  boards: { boards: [], lists: {} },
 *  ui: { selectedBoard: null }
 * }
 *
 *   boardContext.js:23 combineReducer - action RECEIVE_BOARDS
 *   boardContext.js:23 Reducer boards - action RECEIVE_BOARDS
 *   boardContext.js:23 Reducer ui - action RECEIVE_BOARDS
 */
const rootReducer = combineReducers({
  boards: BoardReducer,
  ui: UIReducer,
});

const initialState = {
  boards: BoardInitialState,
  ui: UIInitialState,
};

export const BoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  console.log(state);
  useEffect(() => {
    fetchBoards().then((data) =>
      dispatch({
        type: "RECEIVE_BOARDS",
        payload: data,
      })
    );
  }, []);

  const actions = {
    selectBoard: (board) =>
      dispatch({
        type: "SELECT_BOARD",
        payload: board,
      }),
  };

  const selectors = {
    getSelectedBoard: () => state.ui.selectedBoard,
    getMessage: () => state.ui.message,
  };

  return (
    <BoardContext.Provider value={{ selectors, actions, state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContext;
