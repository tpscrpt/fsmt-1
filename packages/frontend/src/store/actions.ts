import {
  ADD_TODO,
  TodoActionType,
  GET_TODOS_FETCHING,
  GET_TODOS_ERROR,
  SetFilterTagAction,
  SET_FILTER_TAG,
  ADD_TODOS,
  POST_TODO_FETCHING,
  POST_TODO_ERROR,
  AppThunk,
} from "./types";
import { TodoResource } from "backend/src/resources/todo";
import { client } from "../services/client";
import { AxiosError } from "axios";

export function setFilterTag(payload: string): SetFilterTagAction {
  console.log("setFilterTag");
  return {
    type: SET_FILTER_TAG,
    payload,
  };
}

export function addTodo(todo: TodoResource): TodoActionType {
  console.log("addTodo");
  return {
    type: ADD_TODO,
    payload: todo,
  };
}

export function addTodos(todos: TodoResource[]): TodoActionType {
  console.log("addTodos");
  return {
    type: ADD_TODOS,
    payload: todos,
  };
}

export function getTodosFetching(): TodoActionType {
  console.log("getTodosFetching");
  return {
    type: GET_TODOS_FETCHING,
  };
}

export function getTodosError(payload: string): TodoActionType {
  console.log("getTodosError");
  return {
    type: GET_TODOS_ERROR,
    payload,
  };
}

export const getTodos = (): AppThunk<void> => async (dispatch): Promise<void> => {
  console.log("getTodos");
  dispatch(getTodosFetching());
  try {
    const response = await client.getTodos();
    dispatch(addTodos(response.data.body as TodoResource[]));
  } catch (e) {
    const _e = e as AxiosError<{ error: string }>;
    dispatch(getTodosError(_e.response?.data.error || "Unknown"));
    setTimeout(() => dispatch(getTodosError("")), 7500);
  }
};

export function postTodoFetching(): TodoActionType {
  console.log("postTodoFetching");
  return {
    type: POST_TODO_FETCHING,
  };
}

export function postTodoError(payload: string): TodoActionType {
  console.log("postTodoError");
  return {
    type: POST_TODO_ERROR,
    payload,
  };
}

export const postTodo = (content: string, tags: string[]): AppThunk<void> => async (dispatch): Promise<void> => {
  console.log("postTodo");
  dispatch(postTodoFetching());
  try {
    const postResponse = await client.postTodo({ content, tags });
    const getResponse = await client.getTodo(postResponse.data.body as string);
    dispatch(addTodo(getResponse.data.body as TodoResource));
  } catch (e) {
    const _e = e as AxiosError<{ error: string }>;
    dispatch(postTodoError(_e.response?.data.error || "Unknown"));
    setTimeout(() => dispatch(postTodoError("")), 7500);
  }
};
