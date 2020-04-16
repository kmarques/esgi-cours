import React, {useState} from "react";
import {Button} from "./Styled";
import BoardList from "../../components/Board/BoardList";

const initBoards = [
  {
    id: 1, 
    name: 'Board 1',
    lists: [
      {
        id: 1,
        title: "Liste 1"
      },
      {
        id:2,
        title: "Liste 2"
      }
    ]
  },
  {
    id: 2, 
    name: 'Board 2',
    lists: [
      {
        id: 3,
        title: "Liste 3"
      },
      {
        id:4,
        title: "Liste 4"
      }
    ]
  },
  {id: 3, name: 'Board 3'},
]

// OLD WAY
class ThemeWrapper2 extends React.Component {
  state = {
    theme: "dark",
    dimension: [10, 20]
  }

  render() {
    return <div style={{
      width: "100%",
      backgroundColor: this.state.theme === "dark" ? "black" : "white"
    }}>
      <Button color={this.state.theme === "dark" ? "white" : "black"} 
        title="switch theme" onClick={() => this.setState({
            theme: this.state.theme === "dark" ? "light" : "dark"
          })}/>
    </div>;
  }
}

// NEW WAY
/**
 * component: {
 *  cursor_state: 0,
 *  states: [
 *    "light",
 *    []
 *    [{id: 1, name: "Board 1"}, ...]
 *  ]
 * }
 */
function ThemeWrapper() {
    // ['dark', (value) => this.state[0] = value ]
    const [theme, setTheme] = useState("light");
    // [[], (value) => this.state[1] = value ]
    const [dimension, setDimension] = useState([]);

    const [boards, setBoards] = useState(initBoards);

    const addList = (list, board) => {

      setBoards(boards.map(_board => {
          if (_board.id === board.id) {
            _board.lists = [
              ..._board.lists,
              list
            ];
          }

          return _board;
      }));
      
    }

    return <div style={{
      width: "100vw",
      height: "100vh",
      display: 'flex',
      flexDirection: "column",
      backgroundColor: theme === "dark" ? "black" : "white"
    }}>
      <Button color={theme === "dark" ? "white" : "black"} title="switch theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}/>
      <BoardList boards={boards} addList={addList}/>
    </div>;
}

export default ThemeWrapper;