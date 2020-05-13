import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import Todo from "./Todo";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { TodoStateTodos } from "../../../store/types";
import { deleteTodo } from "../../../store/actions";

type StateProps = {
  todos: TodoStateTodos;
  fetching: boolean;
  error: string;
  filterTag: string;
};

const mapStateToProps = (state: RootState): StateProps => ({
  todos: state.todo.todos,
  fetching: state.todo.fetching.getTodos,
  error: state.todo.errors.getTodos,
  filterTag: state.todo.filterTag,
});

const mapDispatchToProps = {
  deleteTodo,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

function TodosList({ todos, fetching, error, filterTag, deleteTodo }: Props): JSX.Element {
  console.log("Rendering todos list");

  const filteredTodos = Object.values(todos).filter((todo) => !filterTag || todo.tags.includes(filterTag));

  return (
    <div className="bodyContainer">
      <div style={{ width: "100%" }}>
        {ErrorMessage({ error })}
        {fetching ? (
          <p>Fetching...</p>
        ) : (
          filteredTodos.map((todo) => <Todo todo={todo} key={todo.todoId} deleteTodo={deleteTodo} />)
        )}
      </div>
    </div>
  );
}

export default connector(TodosList);
