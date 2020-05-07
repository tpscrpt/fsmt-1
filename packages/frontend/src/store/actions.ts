import {
  ADD_TODO,
  TodoActionType,
  GET_TODOS_FETCHING,
  GET_TODOS_ERROR,
  SetFilterTagAction,
  SET_FILTER_TAG,
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

export function getTodosFetching(payload: boolean): TodoActionType {
  console.log("getTodosFetching");
  return {
    type: GET_TODOS_FETCHING,
    payload,
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
  dispatch(getTodosFetching(true));
  const response = await client.getTodos();
  switch (response.status) {
    case 200:
      await Promise.all((response.data.body as TodoResource[]).map((todo) => dispatch(addTodo(todo))));
      dispatch(getTodosFetching(false));
      break;
    default:
      dispatch(getTodosError(response.data.error || "Unknown"));
      setTimeout(() => dispatch(getTodosError("")), 7500);
  }
};
