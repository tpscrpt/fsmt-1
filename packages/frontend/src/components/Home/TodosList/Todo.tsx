import React from "react";
import { TodoResource } from "backend/src/resources/todo";
import "./Todo.css";

type Props = {
  todo: TodoResource;
};

function Todo({ todo: { content, tags, created, todoId } }: Props): JSX.Element {
  console.log(todoId);
  return (
    <div className="Todo">
      <p>{new Date(created).toLocaleTimeString()}</p>
      <p>{content}</p>
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

export default Todo;
