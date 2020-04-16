import React from "react";
import List from "../List";
import Form from "../Form";

const Board = ({board, addListsToBoard}) => {
    return <div style={{flex: 1, display: "flex", flexDirection: "column"}}>
      <h1>{board.name}</h1>
      <div style={{flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around"}}>
        {/* Afficher un formulaire qui rajoute une liste à un board */}
        <Form lists={board.lists} updateList={(list) => addListsToBoard(board, list)} />
        {/*Afficher l'ensemble des listes du Board */}
        {board.lists.map(list => (

          <List key={list.id} list={list} />
          ))}
        
      </div>
    </div>
}

export default Board;