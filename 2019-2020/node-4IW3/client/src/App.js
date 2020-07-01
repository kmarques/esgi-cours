import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ThemeWrapper from "./components/lib/ThemeWrapper";
import BoardList from "./components/Board/BoardList";
import { BoardProvider } from "./context/BoardContext";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import CreateOrder from "./components/CreateOrder";

function App() {
  return (
    <div className="App">
      <ThemeWrapper>
        <BoardProvider>
          <Router>
            <Route path="/" component={Navigation} />
            <Switch>
              <Route path={"/create-order"} component={CreateOrder} />
              <Route path={"/boards/:id"} component={BoardList} toto={"foo"} />
              <Route path={"/boards"} component={BoardList} />
              <Route path={"/login"} component={Login} />
            </Switch>
          </Router>
        </BoardProvider>
      </ThemeWrapper>
    </div>
  );
}

export default App;
