import React, { useEffect, useState, useContext } from "react";
import List from "../List";
import Form from "../Form";
import useBoards from "../../hooks/useBoards";

const Board = ({ board }) => {
  const { selectors, actions } = useBoards();
  const lists = selectors.getLists(board);

  useEffect(() => {
    actions.fetchLists(board);
  }, [board.id]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <h1>{board.name}</h1>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {/* Afficher un formulaire qui rajoute une liste à un board */}
        <Form
          updateList={(list) => actions.addList({ ...list, boardId: board.id })}
        />
        {/*Afficher l'ensemble des listes du Board */}
        {lists.map((list) => (
          <List key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default Board;
