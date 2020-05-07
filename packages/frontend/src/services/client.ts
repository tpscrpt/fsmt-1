import Axios, { AxiosResponse } from "axios";
import {
  GetTodosResponseData,
  PostTodoResponseData,
  PostTodoRequestBody,
  GetTodoResponseData,
} from "backend/src/routes/todos";

type ClientResponse<T> = Promise<AxiosResponse<T>>;

class Client {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:9000";
  }

  public getTodos(): ClientResponse<GetTodosResponseData> {
    return Axios.get(`${this.baseUrl}/todos`);
  }

  public getTodo(todoId: string): ClientResponse<GetTodoResponseData> {
    return Axios.get(`${this.baseUrl}/todo/${todoId}`);
  }

  public postTodo(body: PostTodoRequestBody): ClientResponse<PostTodoResponseData> {
    return Axios.post(`${this.baseUrl}/todo`, body);
  }
}

export const client = new Client();
