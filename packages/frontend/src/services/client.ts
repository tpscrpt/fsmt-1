import Axios, { AxiosResponse, AxiosError } from "axios";
import {
  GetTodosResponseData,
  PostTodoResponseData,
  PostTodoRequestBody,
  GetTodoResponseData,
  DeleteTodoRequestParams,
  DeleteTodoResponseData,
} from "backend/src/routes/todos";

type ClientResponse<T> = Promise<AxiosResponse<T>>;

export type ClientError = AxiosError<{ error: string }>;

class Client {
  private baseUrl: string;

  constructor() {
    this.baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:9000"
        : process.env.NODE_ENV === "test"
        ? "http://localhost:9001"
        : process.env.NODE_ENV === "production"
        ? process.env.PUBLIC_URL
        : "";
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

  public deleteTodo(params: DeleteTodoRequestParams): ClientResponse<DeleteTodoResponseData> {
    return Axios.delete(`${this.baseUrl}/todo/${params.todoId}`);
  }
}

export const client = new Client();
