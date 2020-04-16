import React, {useState} from "react";
import Board from "../Board";

const BoardList = ({boards, addListsToBoard}) => {
  const [selectedBoard, setSelectedBoard] = useState(null);

  return <>
      <nav style={{display: "flex", justifyContent: "space-around"}}>
        { boards.map(board => <span key={board.id} onClick={() => setSelectedBoard(board)}>{board.name}</span>) }
      </nav>
      {Boolean(selectedBoard) && <Board board={selectedBoard} addListsToBoard={addListsToBoard}/>}
      {!Boolean(selectedBoard) && <h1>No board selected</h1>}
  </>;
};

export default BoardList;