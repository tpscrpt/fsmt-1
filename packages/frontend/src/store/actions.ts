import { ADD_TODO, TodoActionType, AppThunk, GET_TODOS_FETCHING, GET_TODOS_ERROR } from "./types";
import { TodoResource } from "backend/src/resources/todo";
import { client } from "../services/client";

export function addTodo(todo: TodoResource): TodoActionType {
  return {
    type: ADD_TODO,
    payload: todo,
  };
}

export function getTodosFetching(payload: boolean): TodoActionType {
  return {
    type: GET_TODOS_FETCHING,
    payload,
  };
}

export function getTodosError(payload: string): TodoActionType {
  return {
    type: GET_TODOS_ERROR,
    payload,
  };
}

export const getTodos = (): AppThunk<void> => async (dispatch): Promise<void> => {
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
