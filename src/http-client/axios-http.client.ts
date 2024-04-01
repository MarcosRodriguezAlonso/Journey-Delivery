/* eslint-disable @typescript-eslint/space-before-function-paren */
import { type Axios } from "axios";
import { HttpClient } from "./http-client";

export class AxiosHttpClient extends HttpClient {
  private readonly baseUrl: string;

  constructor(private readonly client: Axios) {
    super();
    this.baseUrl = "http://localhost:3000";
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

  async get<ResponseType>(path: string): Promise<ResponseType> {
    const url = this.buildUrl({ path });

    const response = await this.client.get(url);
    return response.data;
  }

  private buildUrl({
    path,
    query,
  }: {
    path: string;
    query?: Record<string, string>;
  }): string {
    const url = new URL(`${this.baseUrl}/${path}`);

    const urlParams = new URLSearchParams(query);
    url.search = urlParams.toString();

    return url.toString();
  }
}
