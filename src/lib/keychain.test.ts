jest.mock('react-native-keychain', () => {
  const store: Record<string, {username: string; password: string}> = {};
  return {
    setGenericPassword: jest.fn(
      (username: string, password: string, options?: {service?: string}) => {
        store[options?.service ?? 'default'] = {username, password};
        return Promise.resolve(true);
      },
    ),
    getGenericPassword: jest.fn((options?: {service?: string}) => {
      return Promise.resolve(store[options?.service ?? 'default'] ?? false);
    }),
    resetGenericPassword: jest.fn((options?: {service?: string}) => {
      delete store[options?.service ?? 'default'];
      return Promise.resolve(true);
    }),
  };
});

import keychain from '@lib/keychain';

describe('keychain session', () => {
  it('round-trips a saved session', async () => {
    const session = {
      token: 't1',
      user: {id: '1', name: 'Jane', email: 'jane@example.com'},
    };
    await keychain.saveSession(session);
    const loaded = await keychain.loadSession();
    expect(loaded).toEqual(session);
  });
  it('returns null after clearSession', async () => {
    await keychain.saveSession({token: 't1', user: null});
    await keychain.clearSession();
    const loaded = await keychain.loadSession();
    expect(loaded).toBeNull();
  });
});
