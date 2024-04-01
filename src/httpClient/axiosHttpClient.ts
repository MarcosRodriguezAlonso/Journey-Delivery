import { type Axios } from "axios";
import { HttpClient } from "./httpClient.js";

export class AxiosHttpClient extends HttpClient {
  constructor(private readonly client: Axios) {
    super();
  }

  async post<ResponseType>(url: string, body: unknown): Promise<ResponseType> {
    await this.client.post(url, body);

    return "Successfully created data" as ResponseType;
  }

  async put(url: string, body: unknown): Promise<unknown> {
    throw new Error("Method not implemented.");
  }

  async delete(url: string): Promise<void> {
    await this.client.delete(url);
  }

  async get<ResponseType>(url: string): Promise<ResponseType> {
    const response = await this.client.get(url);

    return response.data;
  }
}
