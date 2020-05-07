import React, { useState, useEffect } from "react";
import Board from ".";

const BoardList = ({boards, addList}) => {
    const [selectedBoard, setSelectedBoard] = useState(null);

    useEffect(() => {
      console.log("mount");
      return () => console.log('unmount');
    }, []);

    useEffect(() => {
      console.log("Updated", selectedBoard);

      return () => {console.log("beforeChange")};
    }, [selectedBoard]);

    return <>
      <nav style={{display: 'flex', justifyContent: 'space-around'}}>
        {boards.map((board, index) => <span key={index} onClick={() => setSelectedBoard(board)}>{board.name}</span>)}
      </nav>
      { selectedBoard && <Board addList={addList} board={selectedBoard}/> }
      { !selectedBoard && <div>No board selected</div> }
    </>;
};

export default BoardList;