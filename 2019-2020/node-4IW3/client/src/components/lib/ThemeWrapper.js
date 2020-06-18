import React, { useState, useEffect } from "react";
import { Button } from "./Styled";
import BoardList from "../../components/Board/BoardList";

// NEW WAY
/**
 * component: {
 *  domElement,
 *  cursor_state: 0,
 *  states: [
 *    "light",
 *    []
 *    [{id: 1, name: "Board 1"}, ...]
 *  ]
 * }
 */
function ThemeWrapper({ children }) {
  // ['dark', (value) => this.state[0] = value ]
  const [theme, setTheme] = useState("light");
  // [[], (value) => this.state[1] = value ]

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme === "dark" ? "black" : "white",
      }}
    >
      <Button
        color={theme === "dark" ? "white" : "black"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        switch theme
      </Button>
      {theme === "light" && children}
    </div>
  );
}

export default ThemeWrapper;
