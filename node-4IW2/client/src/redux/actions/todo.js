
export function fetchTodo() {
    return {
        type: "TODOS_RECEIVED",
        payload: {
            todos: [
                {text: "test"},
                {text: "test 2", completed: true}
            ]
        }
    }
}

export function deleteTodo(todo) {
    return {
        type: "TODOS_DELETE",
        payload: {
            todo
        }
    }
}

export function completeTodo(todo) {
    return {
        type: "TODOS_COMPLETE",
        payload: {
            todo
        }
    }
}

export function newTodo(todo) {
    return {
        type: "TODOS_NEW",
        payload: {
            todo
        }
    }
}