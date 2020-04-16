import React from "react";
import List from "./List";
import Form from "./List/NewListForm";

const Board = ({board, addList}) => {

  return <>
    <h1>{board.name}</h1>
    <div style={{display: 'flex', flex: 1, justifyContent: "space-around"}}>
      <Form onSubmit={(data) => addList(data, board)}/>
      {board.lists && board.lists.map(list => <List key={list.id} list={list}/>)}
    </div>
  </>
}

export default Board;