import React, { createContext, useState, useEffect, useReducer } from "react";

import { fetchBoards } from "./actions/boards";
import {
  reducer as BoardReducer,
  initialState as BoardInitialState,
} from "./reducers/boards";
import {
  reducer as ListReducer,
  initialState as ListInitialState,
} from "./reducers/lists";

const BoardContext = createContext(null);

const combineReducers = (reducers) => {
  return function rootReducer(state, action) {
    console.log("rootReducer - Action " + JSON.stringify(action));
    return Object.keys(reducers).reduce((acc, keyReducer) => {
      console.log(keyReducer + " - Action " + JSON.stringify(action));
      const newState = { ...acc };
      if (
        !action.stopPropagation &&
        (!action.audience ||
          (action.audience && action.audience === keyReducer))
      ) {
        newState[keyReducer] = reducers[keyReducer](acc[keyReducer], action);
      }
      return newState;
    }, state);
  };
};

const rootReducer = combineReducers({
  boards: combineReducers({ boards: BoardReducer, lists: ListReducer }),
});

const rootInitialState = {
  boards: BoardInitialState,
  lists: ListInitialState,
};

export const BoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, rootInitialState);

  useEffect(() => {
    dispatch({
      type: "INIT",
      payload: localStorage.getItem("save-store"),
      audience: "auth",
    });
    fetchBoards().then((data) =>
      dispatch({ type: "RECEIVE_BOARDS", payload: data })
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("save-store", JSON.stringify(state.boards));
  }, [state.boards]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContext;
