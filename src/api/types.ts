export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface APIRequest {
  url: string;
  method?: HttpMethod;
  body?: object;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export interface APIResponse<T> {
  status: boolean;
  message: string;
  data?: T;
}
