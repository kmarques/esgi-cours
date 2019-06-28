import React from "react";
import { TodoContext } from "../store/TodoContext";

class TodoForm extends React.Component {
    static contextType = TodoContext;

    state = {
        text: ""
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.context.newTodo(this.state);
        return false;
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <input 
                value={this.state.text} 
                onChange={(event) => this.setState({
                    text: event.currentTarget.value
                })}/>
            <button type="submit">Valider</button>
        </form>
    }
}

export default TodoForm;