import React, {useState, useEffect} from "react";
import List from './List';
import Form from './Form';

function Board({board, addList}) {
  const [lists, setLists] = useState(board.lists);

   useEffect(() => {
    console.log('componentDidMount');
  }, []);

  useEffect(() => {
    console.log('useEffect - componentDidUpdate - board.lists', board.lists);
    setTimeout(() => {
      setLists(board.lists);
    }, 5000);
    
    return () => {
      console.log('useEffect - unmount - board.lists');
    }
  }, [board.lists]);

  useEffect(() => {
    console.log('useEffect - componentDidUpdate - board.name', board.name);
  }, [board.name]);

  return <>
    <h1>{board.name} {board.lists.length}</h1>
    <div style={{
      flex: 1,
      display: "flex",
      justifyContent: "space-around"
    }}>
      <Form addList={addList}/>
      {board.lists.map(list => {
        return <List key={list.id} list={list}/>;
      })}
    </div>
  </>;
}

export default Board;