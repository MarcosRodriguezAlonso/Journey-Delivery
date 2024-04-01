export abstract class HttpClient {
  abstract get<ResponseType>(path: string): Promise<ResponseType>;
  abstract post<BodyType, ResponseType>(
    path: string,
    body: BodyType,
  ): Promise<ResponseType>;
  abstract delete(path: string): Promise<unknown>;
}
