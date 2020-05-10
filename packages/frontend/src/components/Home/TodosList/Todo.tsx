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
      <div className="TodoHeader">
        <span className="TodoContent">{content}</span>
        <span className="TodoDate">{new Date(created).toLocaleTimeString()}</span>
      </div>
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

export default Todo;
