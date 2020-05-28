import React, { useState, useContext } from "react";
import Board from "./Board";
import BoardContext from "../../context/boardContext";

function BoardList() {
  const { selectors, actions } = useContext(BoardContext);
  const boards = selectors.getBoards();
  const currentBoard = selectors.getSelectedBoard();
  return (
    <React.Fragment>
      <nav style={{ display: "flex", justifyContent: "space-around" }}>
        {boards.map((board) => (
          <li
            key={board.id}
            className={
              Boolean(currentBoard) && currentBoard.id === board.id
                ? "active"
                : null
            }
            onClick={() => actions.select(board)}
          >
            {board.name}
          </li>
        ))}
      </nav>
      {Boolean(currentBoard) && <Board board={currentBoard} />}
      {!Boolean(currentBoard) && "No current Board selected"}
    </React.Fragment>
  );
}

export default BoardList;
