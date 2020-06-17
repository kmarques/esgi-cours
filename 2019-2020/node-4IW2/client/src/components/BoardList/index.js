import React, { useContext } from "react";
import Board from "../Board";
import BoardContext from "../../contexts/boardContext";
import useBoards from "../../hooks/useBoards";

const BoardList = ({}) => {
  const { selectors, actions } = useContext(BoardContext);
  const { selectors: boardsSelectors } = useBoards();

  const boards = boardsSelectors.getBoards();
  const selectedBoard = selectors.getSelectedBoard();

  return (
    <>
      {selectors.getMessage() && <span>{selectors.getMessage()}</span>}
      <nav style={{ display: "flex", justifyContent: "space-around" }}>
        {boards.map((board) => (
          <span key={board.id} onClick={() => actions.selectBoard(board)}>
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
