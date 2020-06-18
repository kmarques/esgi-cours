import React, { useState, useEffect, useContext } from "react";
import List from "./List";
import Form from "./List/NewListForm";
import BoardContext from "../../context/BoardContext";
import useLists from "../../hooks/useLists";
import useBoards from "../../hooks/useBoards";

const Board = ({ board }) => {
  const { selectors, actions } = useLists();
  const { selectors: BoardSelectors } = useBoards();

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
        <span>{BoardSelectors.getBoardsCount()}</span>
      </div>
    </>
  );
};

export default Board;
