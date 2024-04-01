import { type Axios } from "axios";
import { HttpClient } from "./http-client.js";

export class AxiosHttpClient extends HttpClient {
  constructor(private readonly client: Axios) {
    super();
  }

  async post<ResponseType>(url: string, body: unknown): Promise<ResponseType> {
    try {
      await this.client.post(url, body);

      return "Successfully created data" as ResponseType;
    } catch (error) {
      throw new Error(`Failed create data`);
    }
  }

  async put(url: string, body: unknown): Promise<unknown> {
    throw new Error("Method not implemented.");
  }

  async delete(url: string): Promise<unknown> {
    try {
      await this.client.delete(url);

      return "Succesfully deleted";
    } catch (error) {
      throw new Error(`Failed to delete data`);
    }
  }

  async get<ResponseType>(url: string): Promise<ResponseType> {
    try {
      const response = await this.client.get(url);

      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch data`);
    }
  }
}
