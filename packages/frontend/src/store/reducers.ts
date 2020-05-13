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
  REMOVE_TODO,
  DELETE_TODO_FETCHING,
  DELETE_TODO_ERROR,
} from "./types";

const initialState: TodoState = {
  todos: {},
  tags: {},
  filterTag: "",
  fetching: {
    getTodo: false,
    getTodos: false,
    postTodo: false,
    deleteTodo: false,
  },
  errors: {
    getTodos: "",
    getTodo: "",
    postTodo: "",
    deleteTodo: "",
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
        fetching: {
          ...state.fetching,
          postTodo: false,
        },
        errors: {
          ...state.errors,
          postTodo: action.payload,
        },
      };
    case REMOVE_TODO:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          deleteTodo: false,
        },
        todos: ((): TodoStateTodos => {
          const todos = { ...state.todos };
          delete todos[action.payload];
          return todos;
        })(),
        tags: ((): TodoStateTags => {
          const tags = { ...state.tags };
          const todo = state.todos[action.payload];
          todo.tags.forEach((tag) => {
            delete tags[tag][action.payload];
            if (!Object.keys(tags[tag]).length) {
              delete tags[tag];
            }
          });
          return tags;
        })(),
      };
    case DELETE_TODO_FETCHING:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          deleteTodo: true,
        },
      };
    case DELETE_TODO_ERROR:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          deleteTodo: false,
        },
        errors: {
          ...state.errors,
          deleteTodo: action.payload,
        },
      };
    default:
      return state;
  }
}
