import { Server } from "http";
import React from "react";
import { render, fireEvent, wait, getByRole } from "@testing-library/react";
import { Provider } from "react-redux";
import { disconnect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server-global";
import { setup } from "backend/src/main";
import { todos } from "backend/src/__tests__/__fixtures__/todos";
//import { GetTodoResponseData, PostTodoResponseData, GetTodosResponseData } from "backend/src/routes/todos";
//import { PostTodoRequestBody } from "../../routes/todos";
import App from "frontend/src/App";
import { store } from "frontend/src/store";

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

describe("Creating a new todo", () => {
  it("should work", async () => {
    const testTodo = todos[0];
    const { container, getByText, getByLabelText } = render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
    );
    fireEvent.click(getByText(/\+/i));
    console.log(container.innerHTML);
    expect(container.innerHTML).toMatch("Content");

    const content = getByLabelText("todo-content");
    const tags = getByLabelText("todo-tags");
    const submit = getByText("Submit");

    fireEvent.change(content, { target: { value: testTodo.content } });
    testTodo.tags.forEach((tag) => {
      fireEvent.change(tags, { target: { value: `${tag},` } });
    });
    fireEvent.click(submit);

    fireEvent.click(getByText(/Todos/i));

    expect(container.innerHTML).toMatch(/Fetching\.\.\./i);

    await wait(
      () => {
        expect(container.innerHTML).toMatch(new RegExp(testTodo.content, "i"));
        testTodo.tags.forEach((tag) => expect(container.innerHTML).toMatch(new RegExp(tag, "i")));
        console.log(container.innerHTML);
      },
      { timeout: 4000, interval: 500 },
    );
    //try {
    //  await client.getTodo("invalid");
    //} catch (e) {
    //  const _e = e as AxiosError;
    //  expect(_e.response?.status).toBe(400);
    //}
  });
});
