import React, { useContext } from "react";
import useBoards from "../../hooks/useBoards";

const List = ({ list }) => {
  const { selectors } = useBoards();
  const boards = selectors.getBoards();

  /* Afficher une liste */
  return (
    <>
      <div>{list.title}</div>
      <span>Count {boards.length}</span>
    </>
  );
};

export default List;
