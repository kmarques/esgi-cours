import React, {useState} from "react";
import Button from "../Button";

// OLD WAY
class ThemeWrapper2 extends React.Component {
  state = {
    theme: "dark"
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
function ThemeWrapper() {
  const [theme, setTheme] = useState("dark");
    return <div style={{
      width: "100%",
      backgroundColor: theme === "dark" ? "black" : "white"
    }}>
      <Button color={theme === "dark" ? "white" : "black"} title="switch theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}/>
    </div>;
}

export default ThemeWrapper;