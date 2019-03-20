import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MyButton from "./components/Button";
import MyArticleList from "./components/ArticleList";

class App extends Component {
  state = {
    theme: "dark"
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <MyArticleList/>
          <MyButton themeCss={this.state.theme} handleClick={() => this.setState({
            theme: this.state.theme === "dark" ? "light" : "dark"
          })}/>
        </header>
      </div>
    );
  }
}

export default App;
