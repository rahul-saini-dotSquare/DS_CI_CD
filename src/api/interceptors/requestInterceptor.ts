import { InternalAxiosRequestConfig } from 'axios';
import { store } from '@store/Store';
import { getIsOnline } from '@lib/network';
import { ApiError } from '@api/errorHandler';

export const onRequest = (config: InternalAxiosRequestConfig) => {
  if (!getIsOnline()) {
    throw new ApiError('No internet connection. Please check your network.');
  }
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};
