
const todoReducer = (state = {
    todos: []
}, action) => {
    switch(action.type) {
        case "TODOS_RECEIVED":
            return {
                ...state,
                todos: action.payload.todos
            }
        case "TODOS_DELETE":
            return {
                ...state,
                todos: state.todos.filter(item => action.payload.todo.text !== item.text)
            }
        case "TODOS_NEW":
            return {
                ...state,
                todos: [...state.todos, action.payload.todo]
            }
        case "TODOS_COMPLETE":
            return {
                ...state,
                todos: state.todos.map(item => {
                    if (item.text === action.payload.todo.text) {
                        item.completed = !item.completed
                    }
        
                    return item;
                })
            }
        default:
            return state;
    }
}

export default todoReducer;