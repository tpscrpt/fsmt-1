import { Server } from "http";
import Axios from "axios";
import { disconnect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-global";
import { setup } from "../../../main";
import { postTodoRequestBody } from "../../__fixtures__/postTodoRequestBody";
import { PostTodoResponseData } from "../../../routes/todos";
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

describe("Post todo", () => {
  it("should return 200 status and a valid uuid", async () => {
    const response = await Axios.post<PostTodoResponseData>("http://localhost:9000/todo", postTodoRequestBody);
    expect(response.status).toBe(200);
    expect(response.data).toMatch(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
  });
});
