import axios from 'axios';
import { APIResponse } from '@api/types';

export class ApiError extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

const FALLBACK_MESSAGE = 'Something went wrong. Please try again.';

export const normalizeApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data as APIResponse<unknown> | undefined;
    const message = data?.message || error.message || FALLBACK_MESSAGE;
    return new ApiError(message, status, data);
  }
  if (error instanceof Error) {
    return new ApiError(error.message);
  }
  return new ApiError(FALLBACK_MESSAGE);
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return FALLBACK_MESSAGE;
};
