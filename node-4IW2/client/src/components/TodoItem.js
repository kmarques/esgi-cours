import React from "react";
import TodoItemActionsContainer from "./TodoItemActionsContainer";

class TodoItem extends React.Component {
    render() {
        return <li style={{
            opacity: this.props.todo.completed ? 0.5 : 1,
            backgroundColor: "red"
        }}>
            {this.props.todo.text}
            <TodoItemActionsContainer todo={this.props.todo}/>
        </li>;
    }
}

export default TodoItem;