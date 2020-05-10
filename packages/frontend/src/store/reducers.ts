import {
  TodoState,
  TodoActionType,
  ADD_TODO,
  TodoStateTags,
  GET_TODOS_FETCHING,
  GET_TODOS_ERROR,
  SET_FILTER_TAG,
  ADD_TODOS,
  TodoStateTodos,
  POST_TODO_FETCHING,
  POST_TODO_ERROR,
} from "./types";

const initialState: TodoState = {
  todos: {},
  tags: {},
  filterTag: "",
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
    case SET_FILTER_TAG:
      return {
        ...state,
        filterTag: action.payload,
      };
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
        fetching: {
          ...state.fetching,
          getTodos: false,
        },
        errors:
          action.payload === ""
            ? state.errors
            : {
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
            if (!tags[tag]) tags[tag] = {};
            tags[tag][action.payload.todoId] = true;
          });
          return tags;
        })(),
        fetching: {
          ...state.fetching,
          postTodo: false,
        },
      };
    case ADD_TODOS:
      return {
        ...state,
        todos: {
          ...state.todos,
          ...((): TodoStateTodos => {
            const todos: TodoStateTodos = {};
            action.payload.forEach((todo) => (todos[todo.todoId] = todo));
            return todos;
          })(),
        },
        tags: ((): TodoStateTags => {
          const tags = state.tags;
          action.payload.forEach((todo) => {
            todo.tags.forEach((tag) => {
              if (!tags[tag]) tags[tag] = {};
              tags[tag][todo.todoId] = true;
            });
          });
          return tags;
        })(),
        fetching: {
          ...state.fetching,
          getTodos: false,
        },
      };
    case POST_TODO_FETCHING:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          postTodo: true,
        },
      };
    case POST_TODO_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          postTodo: action.payload,
        },
      };
    default:
      return state;
  }
}
