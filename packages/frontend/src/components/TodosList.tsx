import React from "react";
import { connect } from "react-redux";
import { TodoResource } from "backend/src/resources/todo";
import { RootState } from "../store";
import { TodoStateTodos } from "../store/types";
import Todo from "./Todo";

function TodosList({ todos }: TodosListStateProps): JSX.Element {
  return (
    <div>
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.todoId} />
      ))}
    </div>
  );
}

type TodosListStateProps = {
  todos: TodoResource[];
};

function extractTodos(todos: TodoStateTodos, filterTag: string): TodoResource[] {
  return Object.values(todos).filter((todo) => !filterTag || todo.tags.includes(filterTag));
}

const mapStateToProps = (state: RootState): TodosListStateProps => ({
  todos: extractTodos(state.todo.todos, state.todo.filterTag),
});

export default connect(mapStateToProps)(TodosList);
