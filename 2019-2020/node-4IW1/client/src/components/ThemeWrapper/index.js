import React, { useState } from "react";
import Button, {ButtonV2} from "../Button";
import BoardList from "../Board";

const initialBoards = [
  {id: 1, name: "Board 1", lists: [{id: 1, name: 'list1'}, {id: 2, name: 'list2'}]},
  {id: 2, name: "Board 2", lists: [{id: 1, name: 'list1'}, {id: 2, name: 'list2'}]},
  {id: 3, name: "Board 3", lists: [{id: 1, name: 'list1'}, {id: 2, name: 'list2'}]}
];

// Old Way
class ThemeWrapperOld extends React.Component {
  state = {
    theme: "dark"
  }

  render() {
    return <div style={{
      width: "100%",
      backgroundColor: this.state.theme === "dark" ? "black" : "white"
    }}>
      <Button theme={this.state.theme} title="switch theme" onClick={() => this.setState({
        theme: this.state.theme === "dark" ? "light" : "dark"
      })}/>
    </div>;
  }
}
/**
 * component.cursor_state=1
 * component.states = [
 *    "dark",
 *    [100, 500]
 * ]
 */
// New Way
function ThemeWrapper() {
  const [theme, setTheme] = useState("dark");
  const [dimension, setDimension] = useState({
    width: null,
    height: null,
  });
  const [boards, setBoards] = useState(initialBoards);

  function addList(_board, list) {
    setBoards(boards.map(board => {
      if(board.id === _board.id) {
        board.lists = [...board.lists, list];
      }

      return board;
    }))
  }

  return <div style={{
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme === "dark" ? "black" : "white"
  }}>
    <Button theme={theme} title="switch theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}/>
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "orange"
    }}>
      <BoardList boards={boards} addList={addList}/>
    </div>
  </div>;
}

export default ThemeWrapper;