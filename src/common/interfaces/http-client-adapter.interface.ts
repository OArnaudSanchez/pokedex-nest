export interface IHttpClientAdapter {
  get<T>(url: string): Promise<T>;
}
