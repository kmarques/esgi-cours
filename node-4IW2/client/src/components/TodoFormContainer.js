import {newTodo} from "../redux/actions/todo";
import {connect} from "react-redux";
import TodoForm from "./TodoForm";

const mapDispatchToProps = (dispatch) => {
    return {
        onNew: (todo) => dispatch(newTodo(todo))
    }
}

export default connect(undefined, mapDispatchToProps)(TodoForm);