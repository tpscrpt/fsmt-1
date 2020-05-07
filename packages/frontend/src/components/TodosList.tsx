import React from "react";
import { connect } from "react-redux";
import { TodoResource } from "backend/src/resources/todo";
import { RootState } from "../store";
import { TodoStateTodos } from "../store/types";
import Todo from "./Todo";

function TodosList({ todos, fetching }: TodosListStateProps): JSX.Element {
  console.log("Rendering todos list");
  return <div>{fetching ? <p>Fetching...</p> : todos.map((todo) => <Todo todo={todo} key={todo.todoId} />)}</div>;
}

type TodosListStateProps = {
  todos: TodoResource[];
  fetching: boolean;
};
function extractTodos(todos: TodoStateTodos, filterTag: string): TodoResource[] {
  return Object.values(todos).filter((todo) => !filterTag || todo.tags.includes(filterTag));
}
const mapStateToProps = (state: RootState): TodosListStateProps => ({
  todos: extractTodos(state.todo.todos, state.todo.filterTag),
  fetching: state.todo.fetching.getTodos,
});

export default connect(mapStateToProps)(TodosList);
