import axios from 'axios';
import {
  normalizeApiError,
  getErrorMessage,
  ApiError,
} from '@api/errorHandler';

describe('normalizeApiError', () => {
  it('extracts status and server message from an axios error', () => {
    const axiosError = new axios.AxiosError(
      'Request failed',
      'ERR_BAD_REQUEST',
      undefined,
      undefined,
      {
        status: 401,
        data: { success: false, message: 'Unauthorized' },
      } as never,
    );
    const result = normalizeApiError(axiosError);
    expect(result).toBeInstanceOf(ApiError);
    expect(result.status).toBe(401);
    expect(result.message).toBe('Unauthorized');
  });
  it('preserves the message of a plain Error', () => {
    const result = normalizeApiError(new Error('boom'));
    expect(result.message).toBe('boom');
    expect(result.status).toBeUndefined();
  });
  it('falls back for a non-error value', () => {
    const result = normalizeApiError('nope');
    expect(result.message).toBe('Something went wrong. Please try again.');
  });
});

describe('getErrorMessage', () => {
  it('returns the message of an Error', () => {
    expect(getErrorMessage(new Error('bad'))).toBe('bad');
  });
  it('returns the fallback for a non-error value', () => {
    expect(getErrorMessage(42)).toBe('Something went wrong. Please try again.');
  });
});
