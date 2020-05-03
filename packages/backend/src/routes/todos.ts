import { Router } from "express";
import { TodoResource } from "../resources/todo";
import { Route } from "../classes/route";

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

export const route = new Route("todos", router);
