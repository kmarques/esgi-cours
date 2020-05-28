import React, { useContext } from "react";
import BoardContext from "../../../context/boardContext";

const List = ({ list }) => {
  const { selectors } = useContext(BoardContext);
  const boards = selectors.getBoards();

  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      {list.name}
      <span>Count {boards.length}</span>
    </div>
  );
};

export default List;
