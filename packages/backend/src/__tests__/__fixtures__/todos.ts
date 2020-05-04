import { v4 as uuidv4 } from "uuid";
import { TodoResource } from "../../resources/todo";

export const todos: TodoResource[] = [
  {
    content: "Retrieve me from the database",
    created: new Date(),
    tags: ["testing", "unit", "jest"],
    todoId: uuidv4(),
  },
  {
    content: "Pen spinning tricks",
    created: new Date(),
    tags: ["advanced", "basic", "intermediate"],
    todoId: uuidv4(),
  },
  {
    content: "Third time's the charm",
    created: new Date(),
    tags: ["number", "3", "ok"],
    todoId: uuidv4(),
  },
];
