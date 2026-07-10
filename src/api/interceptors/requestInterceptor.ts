import { InternalAxiosRequestConfig } from 'axios';
import { store } from '@store/Store';

export const onRequest = (config: InternalAxiosRequestConfig) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};
