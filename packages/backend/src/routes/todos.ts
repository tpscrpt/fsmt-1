import { Router } from "express";
import { TodoResource } from "../resources/todo";
import { Route } from "../classes/route";
import { BodyOnlyPostRequest } from "../types/request";

const router = Router();

export type GetTodosResponse = TodoResource[];

const mockTodos: GetTodosResponse = [
  {
    id: "abc",
    content: "my sick todo",
    created: new Date(),
    tags: ["placeholder"],
  },
];

router.get("/", async (_, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(mockTodos));
});

export type PostTodoRequestBody = {
  content: string;
  tags: string[];
};
type PostTodoRequest = BodyOnlyPostRequest<PostTodoRequestBody>;

router.post("/", async (req: PostTodoRequest, res) => {
  console.log(req.body);
  const { content, tags } = req.body;
  console.log(content, tags);
  res.send("OK");
});

export const route = new Route("todos?", router);
