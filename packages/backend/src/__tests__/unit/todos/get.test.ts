import { Server } from "http";
import Axios from "axios";
import { disconnect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-global";
import { setup } from "../../../main";
import { Todo } from "../../../resources/todo";
import { todos } from "../../__fixtures__/todos";
import { GetTodosResponseData } from "../../../routes/todos";

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
    const response = await Axios.get<GetTodosResponseData>("http://localhost:9000/todos");
    expect(response.status).toBe(200);
    response.data.body?.forEach((originalTodo, index) => {
      const responseTodo = response.data.body?.[index];
      expect(responseTodo).toMatchObject(originalTodo);
    });
  });
  it("should return an empty response with no todos in the database", async () => {
    const response = await Axios.get<GetTodosResponseData>("http://localhost:9000/todos");
    expect(response.status).toBe(200);
    expect(response.data.body).toHaveLength(0);
  });
});
