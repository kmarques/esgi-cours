import React, { useContext } from "react";
import BoardContext from "../../contexts/boardContext";

const List = ({ list }) => {
  const { getBoards } = useContext(BoardContext);
  const boards = getBoards();

  /* Afficher une liste */
  return (
    <>
      <div>{list.title}</div>
      <span>Count {boards.length}</span>
    </>
  );
};

export default List;
