import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { TodoResource } from "backend/src/resources/todo";
import { RootState } from "../store";
import { TodoStateTodos } from "../store/types";
import Todo from "./Todo";
import ErrorMessage from "./ErrorMessage/ErrorMessage";

type StateProps = {
  todos: TodoResource[];
  fetching: boolean;
  error: string;
};
function extractTodos(todos: TodoStateTodos, filterTag: string): TodoResource[] {
  return Object.values(todos).filter((todo) => !filterTag || todo.tags.includes(filterTag));
}
const mapStateToProps = (state: RootState): StateProps => ({
  todos: extractTodos(state.todo.todos, state.todo.filterTag),
  fetching: state.todo.fetching.getTodos,
  error: state.todo.errors.getTodos,
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

function TodosList({ todos, fetching, error }: Props): JSX.Element {
  console.log("Rendering todos list");
  return (
    <div>
      {ErrorMessage({ error })}
      {fetching ? <p>Fetching...</p> : todos.map((todo) => <Todo todo={todo} key={todo.todoId} />)}
    </div>
  );
}

export default connector(TodosList);
