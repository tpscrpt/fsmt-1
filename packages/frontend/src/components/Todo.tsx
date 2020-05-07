import React from "react";
// import { connect } from "react-redux";
import { TodoResource } from "backend/src/resources/todo";

function Todo({ todo: { content, tags, created, todoId } }: TodoProps): JSX.Element {
  console.log(todoId);
  return (
    <div>
      <p>{new Date(created).toTimeString()}</p>
      <p>{content}</p>
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

type TodoOwnProps = {
  todo: TodoResource;
};

type TodoProps = TodoOwnProps;

export default Todo;
