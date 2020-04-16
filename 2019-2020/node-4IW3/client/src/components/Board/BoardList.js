import React, { useState } from "react";
import Board from ".";

const BoardList = ({boards, addList}) => {
    const [selectedBoard, setSelectedBoard] = useState(null);
    return <>
      <nav style={{display: 'flex', justifyContent: 'space-around'}}>
        {boards.map((board, index) => <span key={index} onClick={() => setSelectedBoard(board)}>{board.name}</span>)}
      </nav>
      { selectedBoard && <Board addList={addList} board={selectedBoard}/> }
      { !selectedBoard && <div>No board selected</div> }
    </>;
};

export default BoardList;