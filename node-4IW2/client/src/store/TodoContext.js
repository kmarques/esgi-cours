import React, { Component, createContext } from "react";

export const TodoContext = createContext({
    todos: [],
    loadTodos: () => {},
    newTodo: () => {},
    toggleTodo: () => {},
    deleteTodo: () => {},
});

export class TodoProvider extends Component {
    state = {
        todos: [],
        loadTodos: () => {
            this.setState({
                todos: [
                    {text: "test context"},
                    {text: "test context 2"}
                ]
            })
        },
        newTodo: (todo) => {
            this.setState({
                todos: [...this.state.todos, todo]
            })
        },
        deleteTodo: (todo) => {
            this.setState({
                todos: this.state.todos.filter(item => {
                    if(item.text !== todo.text) return item;
                })
            })
        }
    }

    render() {
        return <TodoContext.Provider value={this.state}>
            {this.props.children}
          </TodoContext.Provider>
    }
}