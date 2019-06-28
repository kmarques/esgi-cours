import React from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { TodoContext } from "../store/TodoContext";

class TodoList extends React.Component {
    static contextType = TodoContext;

    componentDidMount() {
        this.context.loadTodos();
    }
    
    render () {
        return <ul>
                {
                    this.context.todos.map(todo => <TodoItem 
                        key={todo.text} 
                        todo={todo}
                    />)
                }
        </ul>;
    }
}

export default TodoList;