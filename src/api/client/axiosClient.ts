import axios from 'axios';
import { config } from '@config';
import { onRequest } from '@api/interceptors/requestInterceptor';
import {
  onResponse,
  onResponseError,
} from '@api/interceptors/responseInterceptor';

export const axiosClient = axios.create({
  baseURL: config.env.apiUrl,
  timeout: config.env.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(onRequest);
axiosClient.interceptors.response.use(onResponse, onResponseError);
