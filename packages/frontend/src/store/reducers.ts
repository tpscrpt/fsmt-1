import { TodoState, TodoActionType, ADD_TODO, TodoStateTags, GET_TODOS_FETCHING, GET_TODOS_ERROR } from "./types";

const initialState: TodoState = {
  todos: {},
  tags: {},
  fetching: {
    getTodo: false,
    getTodos: false,
    postTodo: false,
  },
  errors: {
    getTodos: "",
    getTodo: "",
    postTodo: "",
  },
};

export function todoReducer(state = initialState, action: TodoActionType): TodoState {
  switch (action.type) {
    case GET_TODOS_FETCHING:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          getTodos: true,
        },
      };
    case GET_TODOS_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          getTodos: action.payload,
        },
      };
    case ADD_TODO:
      return {
        ...state,
        todos: { ...state.todos, [action.payload.todoId]: action.payload },
        tags: ((): TodoStateTags => {
          const tags = state.tags;
          action.payload.tags.forEach((tag) => {
            tags[tag][action.payload.todoId] = true;
          });
          return tags;
        })(),
      };
    default:
      return state;
  }
}
