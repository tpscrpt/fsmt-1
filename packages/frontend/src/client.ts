import Axios, { AxiosResponse } from "axios";

type ClientResponse<T> = Promise<AxiosResponse<T>>;

class Client {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:9000";
  }

  public getTodos(): ClientResponse<object[]> {
    return Axios.get(`${this.baseUrl}/todos`);
  }
}

export const client = new Client();
