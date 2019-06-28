import React from "react";
import { TodoContext } from "../store/TodoContext";

class TodoItemActions extends React.Component {
    static contextType = TodoContext;
    
    render() {
        return <>
            <a onClick={() => this.context.deleteTodo(this.props.todo)}>Delete</a>
        </>;
    }
}

export default TodoItemActions;