import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ThemeWrapper from "./components/lib/ThemeWrapper";
import BoardList from "./components/Board/BoardList";
import { BoardProvider } from "./context/BoardContext";

function App() {
  return (
    <div className="App">
      <ThemeWrapper>
        <BoardProvider>
          <BoardList />
        </BoardProvider>
      </ThemeWrapper>
    </div>
  );
}

export default App;
