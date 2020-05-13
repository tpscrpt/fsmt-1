import React from "react";
import { TodoResource } from "backend/src/resources/todo";
import "./Todo.css";

type Props = {
  todo: TodoResource;
  deleteTodo: (todoId: string) => void;
};

function Todo({ todo: { content, tags, created, todoId }, deleteTodo }: Props): JSX.Element {
  console.log(todoId);
  return (
    <div className="Todo">
      <div className="TodoHeader">
        <span className="TodoDate">{new Date(created).toLocaleTimeString()}</span>
        <span className="TodoDelete" onClick={(): void => deleteTodo(todoId)}>
          - remove
        </span>
      </div>
      <span className="TodoContent">{content}</span>
      <div className="TodoTags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default Todo;
