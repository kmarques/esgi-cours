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
import {
  reducer as AuthReducer,
  initialState as AuthInitialState,
} from "./reducers/auth";

const BoardContext = createContext(null);

const combineReducers = (reducers) => {
  return function rootReducer(state, action) {
    console.log(`combineReducer - action ${action.type}`);
    return Object.keys(reducers).reduce((acc, keyReducer) => {
      console.log(`Reducer ${keyReducer} - action ${action.type}`);
      const newState = { ...acc };
      if (
        !action.stopPropagation &&
        (!action.audience || action.audience === keyReducer)
      ) {
        newState[keyReducer] = reducers[keyReducer](state[keyReducer], action);
      }

      return newState;
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
  auth: AuthReducer,
});

const initialState = {
  boards: BoardInitialState,
  ui: UIInitialState,
  auth: AuthInitialState,
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

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContext;
