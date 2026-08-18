/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('redux-persist', () => {
  const actual = jest.requireActual('redux-persist');
  return {
    ...actual,
    persistStore: jest.fn(() => ({
      subscribe: jest.fn(() => jest.fn()),
      getState: jest.fn(() => ({ bootstrapped: true })),
      flush: jest.fn(() => Promise.resolve()),
      pause: jest.fn(),
      persist: jest.fn(),
      purge: jest.fn(() => Promise.resolve()),
    })),
  };
});

jest.mock('@lib/NotificationService', () => ({
  __esModule: true,
  default: {
    init: jest.fn(() => Promise.resolve(null)),
    onForegroundMessage: jest.fn(() => jest.fn()),
  },
}));

jest.mock('@lib/SocialLogin', () => ({
  __esModule: true,
  default: { configure: jest.fn() },
}));

jest.mock('@api/service/AuthService', () => ({
  __esModule: true,
  default: { restoreSession: jest.fn(() => Promise.resolve(false)) },
}));

test('renders correctly', async () => {
  let tree: ReactTestRenderer.ReactTestRenderer | undefined;
  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(<App />);
  });
  await ReactTestRenderer.act(() => {
    tree?.unmount();
  });
});
