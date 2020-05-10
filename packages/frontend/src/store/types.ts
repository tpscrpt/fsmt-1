import { ThunkAction } from "redux-thunk";
import { TodoResource } from "backend/src/resources/todo";
import { RootState } from ".";
import { Action } from "redux";

export const SET_FILTER_TAG = "SET_FILTER_TAG";
export type SetFilterTagAction = {
  type: typeof SET_FILTER_TAG;
  payload: string;
};

export const ADD_TODO = "ADD_TODO";
export type AddTodoAction = {
  type: typeof ADD_TODO;
  payload: TodoResource;
};

export const ADD_TODOS = "ADD_TODOS";
export type AddTodosAction = {
  type: typeof ADD_TODOS;
  payload: TodoResource[];
};

export const GET_TODOS_FETCHING = "GET_TODOS_FETCHING";
export type GetTodosFetchingAction = {
  type: typeof GET_TODOS_FETCHING;
};

export const GET_TODOS_ERROR = "GET_TODOS_ERROR";
export type GetTodosErrorAction = {
  type: typeof GET_TODOS_ERROR;
  payload: string;
};

export const POST_TODO_FETCHING = "POST_TODO_FETCHING";
export type PostTodoFetchingAction = {
  type: typeof POST_TODO_FETCHING;
};

export const POST_TODO_ERROR = "POST_TODO_ERROR";
export type PostTodoErrorAction = {
  type: typeof POST_TODO_ERROR;
  payload: string;
};

export type TodoActionType =
  | AddTodoAction
  | AddTodosAction
  | GetTodosFetchingAction
  | GetTodosErrorAction
  | SetFilterTagAction // | RemoveTodoAction
  | PostTodoFetchingAction
  | PostTodoErrorAction;

export type TodoStateTodos = {
  [key: string]: TodoResource;
};
export type TodoStateTags = {
  [key: string]: {
    [key: string]: boolean;
  };
};
export type TodoStateFetching = {
  getTodos: boolean;
  getTodo: boolean;
  postTodo: boolean;
};
export type TodoState = {
  // mapping of todoId to TodoResource
  todos: TodoStateTodos;
  // mapping of given tag to todoId to true/false
  tags: TodoStateTags;
  // tag with which to filter todos
  filterTag: string;
  fetching: TodoStateFetching;
  errors: {
    getTodos: string;
    getTodo: string;
    postTodo: string;
  };
};

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
