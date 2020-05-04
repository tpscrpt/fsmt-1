import assert from "assert";
import { Router, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { TodoResource, Todo } from "../resources/todo";
import { Route } from "../classes/route";
import { BodyOnlyPostRequest, ResponseData } from "../types/request";
import { invalidProperty, $ } from "../errors";

const router = Router();

export type GetTodosResponseData = ResponseData<TodoResource[]>;

router.get("/", async (_, res: Response<GetTodosResponseData>) => {
  res.setHeader("Content-Type", "application/json");
  const todos: TodoResource[] = await Todo.find();
  res.send({
    body: todos.map(({ content, created, tags, todoId }) => ({
      content,
      created,
      tags,
      todoId,
    })),
  });
});

export type PostTodoRequestBody = {
  content: string;
  tags: string[];
};
type PostTodoRequest = BodyOnlyPostRequest<PostTodoRequestBody>;
export type PostTodoResponseData = ResponseData<string>;

router.post(
  "/",
  $(async (req: PostTodoRequest, res: Response<PostTodoResponseData>) => {
    const { content, tags } = req.body;
    assert(typeof content === "string", invalidProperty("content"));
    assert(tags instanceof Array, invalidProperty("tags"));
    const todoId = uuidv4();
    new Todo({
      todoId,
      content,
      tags,
      created: new Date(),
    } as TodoResource).save();
    res.send({ body: todoId });
  }),
);

export const route = new Route("todos?", router);
