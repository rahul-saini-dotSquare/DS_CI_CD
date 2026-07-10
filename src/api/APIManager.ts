import { axiosClient } from '@api/client/axiosClient';
import { APIRequest, APIResponse } from '@api/types';
import { env } from '@config';
import Logger from '@utils/Logger';

class APIManager {
  private constructor() {}

  static makeRequest = async <T>(
    request: APIRequest,
  ): Promise<APIResponse<T>> => {
    const { url, method = 'GET', body, headers, signal } = request;

    const response = await axiosClient.request<APIResponse<T>>({
      url,
      method,
      data: body,
      headers,
      signal,
    });

    if (env.isDevelopment) {
      APIManager.log(request, response.data);
    }

    return response.data;
  };

  private static log(request: APIRequest, data: unknown) {
    Logger.log(`API => ${request.method ?? 'GET'} ${request.url}`, data);
  }
}

export default APIManager;
