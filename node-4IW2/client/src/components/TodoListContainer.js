import React from "react";
import TodoList from "./TodoList";
import {fetchTodo} from "../redux/actions/todo";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        todos: state.todoReducer.todos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTodos: () => dispatch(fetchTodo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);