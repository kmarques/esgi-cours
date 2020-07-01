import React, { useState, useCallback, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button, { ButtonV2 } from "./components/Button";
import ThemeWrapper from "./components/ThemeWrapper";
import BoardList from "./components/Board";
import BoardContext, { BoardProvider } from "./context/boardContext";
import Login from "./components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
import CreateOrder from "./components/CreateOrder";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <ThemeWrapper>
        <Router>
          <Route path="/" component={Navigation} />
          <Switch>
            <BoardProvider>
              <Route path="/login" component={Login} />
              <Route path="/boards">
                <BoardList />
              </Route>
              <Route path="/cart" component={CreateOrder} />
              <Route path="*">
                <Redirect to="/login" />
              </Route>
            </BoardProvider>
          </Switch>
        </Router>
      </ThemeWrapper>
    </div>
  );
}

export default App;
