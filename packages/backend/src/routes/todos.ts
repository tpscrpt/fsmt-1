import assert from "assert";
import { Router, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { TodoResource, Todo } from "../resources/todo";
import { Route } from "../classes/route";
import { BodyOnlyPostRequest, ResponseData, ParamsOnlyGetRequest } from "../types/request";
import { invalidProperty, $ } from "../errors";

const router = Router();

export type GetTodoRequestParams = {
  todoId: string;
};
export type GetTodoRequest = ParamsOnlyGetRequest<GetTodoRequestParams>;
export type GetTodoResponseData = ResponseData<TodoResource>;

router.get("/:todoId", async (req: GetTodoRequest, res: Response<GetTodoResponseData>) => {
  const { todoId } = req.params;
  res.setHeader("Content-Type", "application/json");
  const todo = await Todo.findOne({
    todoId,
  });
  const typedTodo = todo as TodoResource;
  res.send({
    body: {
      content: typedTodo.content,
      tags: typedTodo.tags,
      created: typedTodo.created,
      todoId: typedTodo.todoId,
    },
  });
});

export type GetTodosResponseData = ResponseData<TodoResource[]>;

router.get("/", async (_, res: Response<GetTodosResponseData>) => {
  res.setHeader("Content-Type", "application/json");
  const todos: TodoResource[] = await Todo.find();
  res.send({
    // we need to extract the values we want because it's not done by default
    // alternative is to use .select but that's more work for no gain
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
    await new Todo({
      todoId,
      content,
      tags,
      created: Date.now(),
      // specifying as TodoResource helps with intellisense above
    } as TodoResource).save();
    res.send({ body: todoId });
  }),
);

export const route = new Route("todos?", router);
