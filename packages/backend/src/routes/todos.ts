import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { TodoResource, Todo } from "../resources/todo";
import { Route } from "../classes/route";
import { BodyOnlyPostRequest } from "../types/request";

const router = Router();

export type GetTodosResponse = TodoResource[];

router.get("/", async (_, res) => {
  res.setHeader("Content-Type", "application/json");
  const todos: TodoResource[] = await Todo.find();
  res.send(
    JSON.stringify(
      todos.map(({ content, created, tags, todoId }) => ({
        content,
        created,
        tags,
        todoId,
      })),
    ),
  );
});

export type PostTodoRequestBody = {
  content: string;
  tags: string[];
};
type PostTodoRequest = BodyOnlyPostRequest<PostTodoRequestBody>;

router.post("/", async (req: PostTodoRequest, res) => {
  const { content, tags } = req.body;
  console.log(content, tags);
  const todoId = uuidv4();
  new Todo({
    todoId,
    content,
    tags,
    created: new Date(),
  } as TodoResource).save();
  res.send(todoId);
});

export const route = new Route("todos?", router);
