import {
  ADD_TODO,
  TodoActionType,
  GET_TODOS_FETCHING,
  GET_TODOS_ERROR,
  SetFilterTagAction,
  SET_FILTER_TAG,
  ADD_TODOS,
} from "./types";
import { TodoResource } from "backend/src/resources/todo";
import { client } from "../services/client";
import { ThunkAction } from "redux-thunk";
import { RootState } from ".";

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
    payload: true,
  };
}

export function getTodosError(payload: string): TodoActionType {
  console.log("getTodosError");
  return {
    type: GET_TODOS_ERROR,
    payload,
  };
}

export const getTodos = (): ThunkAction<void, RootState, unknown, TodoActionType> => async (
  dispatch,
): Promise<void> => {
  console.log("getTodos");
  dispatch(getTodosFetching());
  const response = await client.getTodos();
  switch (response.status) {
    case 200:
      dispatch(addTodos(response.data.body as TodoResource[]));
      break;
    default:
      dispatch(getTodosError(response.data.error || "Unknown"));
      setTimeout(() => dispatch(getTodosError("")), 7500);
  }
};
