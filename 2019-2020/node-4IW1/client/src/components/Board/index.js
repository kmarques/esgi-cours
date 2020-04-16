import React, {useState} from "react";
import Board from "./Board";

function BoardList({boards, addList}) {
  const [currentBoard, setCurrentBoard] = useState(undefined);

  function addListToBoard(list) {
    addList(currentBoard, list);
  }

  return <React.Fragment>
    <nav style={{display: "flex", justifyContent: "space-around"}}>
      {
        boards.map(board => <li key={board.id}
          className={Boolean(currentBoard) && currentBoard.id === board.id ? "active" : null}
          onClick={() => setCurrentBoard(board)}>
            {board.name}
          </li>)
      }
    </nav>
      {Boolean(currentBoard) && <Board board={currentBoard} addList={addListToBoard}/>}
      {!Boolean(currentBoard) && "No current Board selected"}
  </React.Fragment>;
}

export default BoardList;