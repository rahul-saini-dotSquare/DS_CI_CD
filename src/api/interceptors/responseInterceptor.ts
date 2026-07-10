import { AxiosError, AxiosResponse } from 'axios';
import { store } from '@store/Store';
import { logout } from '@store/slices/AuthSlice';
import { normalizeApiError } from '@api/errorHandler';
import keychain from '@lib/keychain';

export const onResponse = (response: AxiosResponse) => response;

export const onResponseError = (error: AxiosError) => {
  if (error.response?.status === 401) {
    store.dispatch(logout());
    keychain.clearSession();
  }
  return Promise.reject(normalizeApiError(error));
};
