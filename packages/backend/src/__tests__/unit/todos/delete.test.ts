import { Server } from "http";
import Axios, { AxiosError } from "axios";
import { disconnect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-global";
import { setup } from "../../../main";
import { Todo } from "../../../resources/todo";
import { todos } from "../../__fixtures__/todos";
import { DeleteTodoResponseData } from "../../../routes/todos";
import { TEST_PORT } from "../../../constants";

let server: Server;
let mongoDb: MongoMemoryServer;

beforeEach(async () => {
  mongoDb = new MongoMemoryServer();
  server = await setup(await mongoDb.getUri());
});

afterEach(async () => {
  await disconnect();
  await mongoDb.stop();
  server.close();
});

describe("Delete todo", () => {
  it("should succeed", async () => {
    const originalTodo = todos[0];
    await new Todo(originalTodo).save();
    const response = await Axios.delete<DeleteTodoResponseData>(
      `http://localhost:${TEST_PORT}/todo/${originalTodo.todoId}`,
    );
    expect(response.status).toBe(200);
  });
  it("should fail with 404 not found", async () => {
    try {
      await Axios.delete<DeleteTodoResponseData>(`http://localhost:${TEST_PORT}/todo/${todos[0].todoId}`);
    } catch (e) {
      const _e = e as AxiosError;
      expect(_e.response?.status).toBe(404);
    }
  });
});
