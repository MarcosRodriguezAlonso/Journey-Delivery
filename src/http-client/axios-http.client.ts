import { type Axios } from "axios";
import { HttpClient } from "./http-client.js";

export class AxiosHttpClient extends HttpClient {
  constructor(private readonly client: Axios) {
    super();
  }

  async post<ResponseType>(url: string, body: unknown): Promise<ResponseType> {
    throw new Error("Method not implemented.");
  }

  async put(url: string, body: unknown): Promise<unknown> {
    throw new Error("Method not implemented.");
  }

  async delete(url: string): Promise<unknown> {
    throw new Error("Method not implemented.");
  }

  async get<ResponseType>(url: string): Promise<ResponseType> {
    const response = await this.client.get(url);
    return response.data;
  }
}
