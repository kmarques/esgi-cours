import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ThemeWrapper from "./components/ThemeWrapper";
import BoardList from "./components/BoardList";
import BoardContext, { BoardProvider } from "./contexts/boardContext";

function App() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        backgroundColor: "orange",
      }}
    >
      <ThemeWrapper>
        <BoardProvider>
          <BoardList />
        </BoardProvider>
      </ThemeWrapper>
    </div>
  );
}

export default App;
