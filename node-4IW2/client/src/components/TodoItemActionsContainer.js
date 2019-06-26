import TodoItemActions from "./TodoItemActions";
import {deleteTodo, completeTodo} from "../redux/actions/todo";
import {connect} from "react-redux";

const mapDispatchToProps = (dispatch, ownProps) => {
    const todo = ownProps.todo;
    
    return {
        onDelete: () => dispatch(deleteTodo(todo)),
        onComplete: () => dispatch(completeTodo(todo))
    }
}

export default connect(undefined, mapDispatchToProps)(TodoItemActions);