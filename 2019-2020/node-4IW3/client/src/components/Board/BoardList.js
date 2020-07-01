import React, { useState, useEffect } from "react";
import Board from ".";
import useBoards from "../../hooks/useBoards";
import { Redirect } from "react-router";

const BoardList = ({ location, match, toto }) => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const { selectors } = useBoards();

  useEffect(() => {
    console.log("mount");
    return () => console.log("unmount");
  }, []);

  useEffect(() => {
    console.log("Updated", selectedBoard);

    return () => {
      console.log("beforeChange");
    };
  }, [selectedBoard]);

  if (parseInt(match.params.id, 10) === 404) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      {JSON.stringify(match)}
      <nav style={{ display: "flex", justifyContent: "space-around" }}>
        {selectors.getBoards().map((board, index) => (
          <span key={index} onClick={() => setSelectedBoard(board)}>
            {board.name}
          </span>
        ))}
      </nav>
      {selectedBoard && <Board board={selectedBoard} />}
      {!selectedBoard && <div>No board selected</div>}
    </>
  );
};

export default BoardList;
