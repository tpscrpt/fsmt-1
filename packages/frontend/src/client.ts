import Axios, { AxiosResponse } from "axios";
import { GetTodosResponse } from "backend/src/routes/todos";

type ClientResponse<T> = Promise<AxiosResponse<T>>;

class Client {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:9000";
  }

  public getTodos(): ClientResponse<GetTodosResponse> {
    return Axios.get(`${this.baseUrl}/todos`);
  }
}

export const client = new Client();
