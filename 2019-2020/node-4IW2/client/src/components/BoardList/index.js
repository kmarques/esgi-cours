import React, { useState, useEffect, useContext } from "react";
import Board from "../Board";
import BoardContext from "../../contexts/boardContext";

const BoardList = ({}) => {
  const [selectedBoard, setSelectedBoard] = useState();
  const { getBoards } = useContext(BoardContext);
  const boards = getBoards();

  return (
    <>
      <nav style={{ display: "flex", justifyContent: "space-around" }}>
        {boards.map((board) => (
          <span key={board.id} onClick={() => setSelectedBoard(board)}>
            {board.name}
          </span>
        ))}
      </nav>
      {Boolean(selectedBoard) && <Board board={selectedBoard} />}
      {!Boolean(selectedBoard) && <h1>No board selected</h1>}
    </>
  );
};

export default BoardList;
