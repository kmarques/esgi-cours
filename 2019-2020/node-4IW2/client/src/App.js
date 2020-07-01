import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ThemeWrapper from "./components/ThemeWrapper";
import BoardList from "./components/BoardList";
import BoardContext, { BoardProvider } from "./contexts/boardContext";
import Login from "./components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, useHistory, Redirect } from "react-router";
import Navigation from "./components/Navigation";
import CreateOrder from "./components/CreateOrder";

const GoBackButton = () => {
  const history = useHistory();

  return history.length ? (
    <button onClick={() => history.goBack()}>Go back</button>
  ) : (
    <></>
  );
};

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
          <Router>
            <GoBackButton />
            <Route path="/" component={Navigation} />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/boards/:id" component={BoardList} />
              <Route path="/boards" component={BoardList} />
              <Route path="/cart" component={CreateOrder} />
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Router>
        </BoardProvider>
      </ThemeWrapper>
    </div>
  );
}

export default App;
