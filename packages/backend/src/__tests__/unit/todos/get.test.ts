import { Server } from "http";
import Axios from "axios";
import { disconnect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-global";
import { setup } from "../../../main";
import { Todo, TodoResource } from "../../../resources/todo";
import { todos } from "../../__fixtures__/todos";
import { GetTodosResponseData, GetTodoResponseData } from "../../../routes/todos";
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

describe("Get todos", () => {
  it("should retrieve a list of todos which are in the database", async () => {
    await Promise.all(todos.map((todo) => new Todo(todo).save()));
    const response = await Axios.get<GetTodosResponseData>(`http://localhost:${TEST_PORT}/todos`);
    expect(response.status).toBe(200);
    expect(response.data.body?.length).toBe(todos.length);
  });
  it("should return an empty response with no todos in the database", async () => {
    const response = await Axios.get<GetTodosResponseData>(`http://localhost:${TEST_PORT}/todos`);
    expect(response.status).toBe(200);
    expect(response.data.body).toHaveLength(0);
  });
});

describe("Get individual todo", () => {
  it("should retrieve a single todo which is in the database", async () => {
    const originalTodo = todos[0];
    await new Todo(originalTodo).save();
    const response = await Axios.get<GetTodoResponseData>(`http://localhost:${TEST_PORT}/todo/${originalTodo.todoId}`);
    expect(response.status).toBe(200);
    const responseTodo = response.data.body as TodoResource;
    expect(responseTodo).toMatchObject(originalTodo);
  });
});
