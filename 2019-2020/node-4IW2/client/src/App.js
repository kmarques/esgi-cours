import React from 'react';
import logo from './logo.svg';
import './App.css';
import ThemeWrapper from "./components/ThemeWrapper";

function App() {
  return (<div style={{display: 'flex', height: "100vh", width: "100vw", flexDirection: "column", backgroundColor: "orange"}}>
      <ThemeWrapper/>
    </div>
  );
}

export default App;
