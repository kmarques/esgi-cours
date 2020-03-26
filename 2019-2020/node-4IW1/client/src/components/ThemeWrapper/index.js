import React, { useState } from "react";
import Button from "../Button";

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

// New Way
function ThemeWrapper() {
  const [theme, setTheme] = useState("dark");

  return <div style={{
    width: "100%",
    backgroundColor: theme === "dark" ? "black" : "white"
  }}>
    <Button theme={theme} title="switch theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}/>
  </div>;
}

export default ThemeWrapper;