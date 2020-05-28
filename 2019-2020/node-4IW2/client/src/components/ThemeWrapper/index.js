import React, { useState, useCallback } from "react";
import Button from "../Button";

//New way
const ThemeWrapper = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [dimension, setDimension] = useState([]);

  const onButtonClick = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme]
  );

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme === "dark" ? "black" : "white",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      <Button title="Switch theme" onClick={onButtonClick} />
      {theme === "light" && children}
    </div>
  );
};

export default ThemeWrapper;
