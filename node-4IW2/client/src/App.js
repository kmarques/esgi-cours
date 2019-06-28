import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoContext, TodoProvider } from './store/TodoContext';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
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
      </header>
      <TodoProvider>
        <TodoForm/>
        <TodoList/>
      </TodoProvider>
    </div>
  );
}

export default App;
