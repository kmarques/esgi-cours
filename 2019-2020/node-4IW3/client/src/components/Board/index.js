import React, { useState, useEffect, useContext } from "react";
import List from "./List";
import Form from "./List/NewListForm";
import BoardContext from "../context/BoardContext";

const Board = ({ board }) => {
  const { selectors, actions } = useContext(BoardContext);

  useEffect(() => {
    actions.getLists(board);
  }, [board.id]);

  return (
    <>
      <h1>{board.name}</h1>
      <div style={{ display: "flex", flex: 1, justifyContent: "space-around" }}>
        <Form onSubmit={(data) => actions.addList(data, board)} />
        {selectors.getLists(board) &&
          selectors
            .getLists(board)
            .map((list) => <List key={list.id} list={list} />)}
        <span>{selectors.getBoardsCount()}</span>
      </div>
    </>
  );
};

export default Board;
