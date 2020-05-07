import React, {useState, useCallback} from "react";
import Button from "../Button";
import BoardList from "../BoardList";

const initialBoards = [
  {id: 1, name: 'Board 1', lists: [{id: 1, title: "Mon titre"}, {id:2, title: "Titre 2"}]},
  {id: 2, name: 'Board 2', lists: [{id: 1, title: "Mon titre"}, {id:2, title: "Titre 2"}]},
  {id: 3, name: 'Board 3', lists: [{id: 1, title: "Mon titre"}, {id:2, title: "Titre 2"}]}
];

// Old way
class ThemeWrapperOld extends React.Component {
  state = {
   theme: "light",
   dimension: [100, 400]
  }

  render() {
    return <div style={{
      backgroundColor: this.state.theme === "dark" ? "black" : "white"
    }}>
      <Button title="Switch theme" onClick={() => this.setState({
        theme: this.state.theme === "dark" ? "light" : "dark"
      })}/>
    </div>;
  }
}

//New way
/**
 * component : {
 *    cursor_state: 1
 *    states: [
 *        "light",
 *        [100, 400]
 *    ]
 * }
 */

const ThemeWrapper = () => {
  const [theme, setTheme] = useState("light");
  const [dimension, setDimension] = useState([]);
  const [boards, setBoards] = useState(initialBoards);

  const addListsToBoard = (board, list) => {
    let x = boards.map(b => {
      if(b.id === board.id) b.lists.push(list);
      
      return b
    })
    setBoards(x)
  }
  const onButtonClick = useCallback(() => setTheme(theme === "dark" ? "light" : "dark"), [theme]);
  
  return <div style={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme === "dark" ? "black" : "white",
    color: theme === "dark" ? "white": "black"
  }}>
    <Button title="Switch theme" onClick={onButtonClick}/>
    {theme === "light" && <BoardList boards={boards} addListsToBoard={addListsToBoard} />}
  </div>;
}

export default ThemeWrapper;